import { economy } from "./economy";
import { XPAction } from "./economy";
import type { Ctx } from "@/functions/manager";

export const rankEngine = ({
  ds,
  ext,
  activity,
}: Pick<Ctx, "ds" | "ext" | "activity">) => {
  const eco = economy({ ds, ext, activity });

  let rankCache: any[] | null = null;
  let order: Record<string, number> = {};

  const getRanks = async () => {
    if (rankCache) return rankCache;
    rankCache = await ds.Ranks.catalog();
    rankCache.sort((a, b) => a.order - b.order);
    order = Object.fromEntries(rankCache.map((r) => [r.id, r.order]));
    return rankCache;
  };

  const unlockPerksForRank = async (rankId: string, user: string) => {
    const catalog = await ds.Perks.getCatalog();

    const instant = catalog.filter(
      (p) => p.unlockRule.on === "RANK_UP" && p.unlockRule.rankId === rankId,
    );

    const seedable = catalog.filter(
      (p) =>
        (order[p.minRankId] ?? 0) <= (order[rankId] ?? 0) &&
        p.unlockRule.on !== "RANK_UP",
    );

    const now = Date.now();

    await Promise.all(
      instant.map((p) =>
        ds.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: 0,
          status: "AVAILABLE",
          availableAt: now,
          cooldownSec:
            p.executionRule.type === "ON_COOLDOWN"
              ? p.executionRule.cooldownSec
              : 0,
        }),
      ),
    );

    await Promise.all(
      seedable.map(async (p) => {
        const exists = await ds.Perks.getState(user, p.id);
        if (exists) return;

        const initTarget =
          p.unlockRule.on === "ACTION_COUNT" ? (p.unlockRule.times ?? 1) : 1;

        await ds.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: initTarget,
          status: "LOCKED",
          availableAt: 0,
          cooldownSec: p.executionRule.cooldownSec ?? 0,
        });
      }),
    );
  };

  return {
    maybeRankUp: async (userAddr: string) => {
      const u = await ds.Users.getUser(userAddr);
      if (!u) return;

      const ranks = await getRanks();

      if (!u.currentRank) {
        const first = ranks[0];
        await Promise.all([
          ds.Users.updateUser(userAddr, { currentRank: first.id }),
          ds.Ranks.addUserRank(userAddr, first.id),
        ]);
        await unlockPerksForRank(first.id, userAddr);
        await activity.rankUp(userAddr, first.id);
        return;
      }

      const idx = ranks.findIndex((r) => r.id === u.currentRank);
      if (idx < 0 || idx >= ranks.length - 1) return;

      const next = ranks[idx + 1];
      if (u.xpTotal < next.minXp) return;

      await Promise.all([
        ds.Users.updateUser(userAddr, { currentRank: next.id }),
        ds.Ranks.addUserRank(userAddr, next.id),
      ]);
      
      await unlockPerksForRank(next.id, userAddr);
      await activity.rankUp(userAddr, next.id);
      await eco.addXp(userAddr, 10, XPAction.RANK_UP_BONUS, `Reached ${next.name}`);
    },
  };
};
