// rankEngine.ts
import { economy, XPAction } from "./economy";
import type { Ctx } from "@/functions/manager";
import type { PerksDSType } from "@/datasources/perks";
import type { RanksDSType } from "@/datasources/ranks";
import type { UsersDSType } from "@/datasources/users";
import type { ActivityLogger } from "../library/activity";

// ---------- Minimal domain shapes used here ----------
type Rank = {
  id: string;
  name: string;
  order: number; // ascending
  minXp: number;
};

// ---------- DS ports narrowed to what we use ----------
type DSUsersPort = Pick<UsersDSType, "getUser" | "updateUser">;
type DSRanksPort = Pick<RanksDSType, "catalog" | "addUserRank">;
type DSPerksPort = Pick<PerksDSType, "getCatalog" | "getState" | "upsertState">;

type DS = {
  Users: DSUsersPort;
  Ranks: DSRanksPort;
  Perks: DSPerksPort;
};

const tryActivity = async <K extends keyof ActivityLogger>(
  activity: ActivityLogger | undefined,
  key: K,
  ...args: Parameters<NonNullable<ActivityLogger[K]>>
) => {
  try {
    const fn = activity?.[key] as any;
    if (typeof fn === "function") await fn(...args);
  } catch {
    /* best-effort: don't break flow */
  }
};

export const rankEngine = ({
  ds,
  ext,
  activity,
}: Pick<Ctx, "ds" | "ext" | "activity">) => {
  const eco = economy({ ds, ext, activity });

  // Locally narrow ports for this module
  const ports = ds as unknown as DS;
  const acts = activity as unknown as ActivityLogger | undefined;

  let rankCache: Rank[] | null = null;
  let orderById: Record<string, number> = Object.create(null);

  const getRanks = async (): Promise<Rank[]> => {
    if (rankCache) return rankCache;
    rankCache = await ports.Ranks.catalog();
    rankCache.sort((a, b) => a.order - b.order);
    orderById = Object.fromEntries(rankCache.map((r) => [r.id, r.order]));
    return rankCache;
  };

  const unlockPerksForRank = async (rankId: string, user: string) => {
    const [catalog, ranks] = await Promise.all([
      ports.Perks.getCatalog(),
      getRanks(),
    ]);
    if (!orderById || Object.keys(orderById).length === 0) {
      for (const r of ranks) orderById[r.id] = r.order;
    }

    const instant = catalog.filter(
      (p) => p.unlockRule.on === "RANK_UP" && p.unlockRule.rankId === rankId,
    );

    const seed = catalog.filter(
      (p) =>
        (orderById[p.minRankId] ?? 0) <= (orderById[rankId] ?? 0) &&
        p.unlockRule.on !== "RANK_UP",
    );

    const now = Date.now();

    await Promise.all(
      instant.map((p) =>
        ports.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: 0,
          status: "AVAILABLE",
          availableAt: now,
          cooldownSec:
            p.executionRule.type === "ON_COOLDOWN"
              ? (p.executionRule.cooldownSec ?? 0)
              : 0,
          seen: [],
        }),
      ),
    );

    await Promise.all(
      seed.map(async (p) => {
        const exists = await ports.Perks.getState(user, p.id);
        if (exists) return;

        const initTarget =
          p.unlockRule.on === "ACTION_COUNT" ? (p.unlockRule.times ?? 1) : 1;
        await ports.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: initTarget,
          status: "LOCKED",
          availableAt: 0,
          cooldownSec: p.executionRule.cooldownSec ?? 0,
          seen: [],
        });
      }),
    );
  };

  const bootstrapFirstRank = async (userAddr: string, ranks: Rank[]) => {
    if (ranks.length === 0) return; // no ranks configured
    const first = ranks[0] as Rank;
    await Promise.all([
      ports.Users.updateUser(userAddr, { currentRank: first.id }),
      ports.Ranks.addUserRank(userAddr, first.id),
    ]);
    await unlockPerksForRank(first.id, userAddr);
    await tryActivity(acts, "rankUp", userAddr, first.id);
  };

  const promoteNextRank = async (
    userAddr: string,
    u: { xpTotal: number; currentRank: string },
    ranks: Rank[],
  ) => {
    const idx = ranks.findIndex((r) => r.id === u.currentRank);
    if (idx < 0) return;

    const next = ranks[idx + 1] as Rank;
    if (u.xpTotal < next.minXp) return;

    await Promise.all([
      ports.Users.updateUser(userAddr, { currentRank: next.id }),
      ports.Ranks.addUserRank(userAddr, next.id),
    ]);
    await unlockPerksForRank(next.id, userAddr);
    await tryActivity(acts, "rankUp", userAddr, next.id);
    await eco.addXp(
      userAddr,
      10,
      XPAction.RANK_UP_BONUS,
      `Reached ${next.name}`,
    );
  };

  return {
    maybeRankUp: async (userAddr: string) => {
      const u = await ports.Users.getUser(userAddr);
      if (!u) return;

      const ranks = await getRanks();
      if (!u.currentRank) {
        await bootstrapFirstRank(userAddr, ranks);
      } else {
        await promoteNextRank(
          userAddr,
          { xpTotal: u.xpTotal, currentRank: u.currentRank },
          ranks,
        );
      }
    },

    // Optional: clear in-memory caches if rank catalog changes at runtime
    resetCache: () => {
      rankCache = null;
      orderById = Object.create(null);
    },
  };
};
