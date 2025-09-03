import type { Ctx } from "../manager";
import { perkEngine } from "./perk";
import { Actor, DistinctBy } from "../../models/perk";

/**
 * The interval, in milliseconds, at which the perk cache is refreshed.
 * 
 * This value is determined by the `API_REFRESH_PERK_CACHE_SECONDS` environment variable.
 * If the environment variable is not set, it defaults to 5000 milliseconds (5 seconds).
 */
const REFRESH_INTERVAL = +(process.env.API_REFRESH_PERK_CACHE_SECONDS || 5_000);

/**
 * Represents a log event within the system.
 *
 * @property type - The type of the event.
 * @property author - The author who triggered the event.
 * @property targetId - (Optional) The identifier of the target entity related to the event.
 * @property targetType - (Optional) The type of the target entity.
 * @property meta - (Optional) Additional metadata associated with the event.
 */
export interface LogEvt {
  type: string;
  author: string;
  targetId?: string;
  targetType?: string;
  meta?: Record<string, any>;
}

const fingerprint = (
  log: LogEvt,
  distinctBy?: DistinctBy | null,
): string | null =>
  distinctBy === "TARGET"
    ? (log.targetId ?? null)
    : distinctBy === "USER"
      ? log.author
      : null;

export const progressEngine = ({
  ds,
  activity,
}: Pick<Ctx, "ds" | "activity">) => {
  let perkCache: Record<string, any[]> = {};
  let rankOrder: Record<string, number> = {};
  let lastLoad = 0;

  const ensureRanks = async () => {
    if (Object.keys(rankOrder).length) return;
    const ranks = await ds.Ranks.catalog();
    ranks.sort((a, b) => a.order - b.order);
    rankOrder = Object.fromEntries(ranks.map((r) => [r.id, r.order]));
  };

  const refreshPerkCache = async () => {
    if (Date.now() - lastLoad < REFRESH_INTERVAL) return;
    perkCache = {};
    const catalog = await ds.Perks.getCatalog();
    for (const p of catalog) {
      if (
        (p.unlockRule.on === "ACTION" || p.unlockRule.on === "ACTION_COUNT") &&
        typeof p.unlockRule.action === "string"
      ) {
        (perkCache[p.unlockRule.action] ??= []).push(p);
      }
    }
    lastLoad = Date.now();
  };


  const isRepeatable = (meta: any): boolean =>
    meta.executionRule.type === "ON_COOLDOWN" ||
    (meta.hooks ?? []).some(
      (h: any) => h.type === "RELOCK" || h.type === "RESET_PROGRESS",
    );

  const beneficiary = async (
    log: LogEvt,
    rule: any,
  ): Promise<string | null> => {
    switch ((rule.actor as Actor) ?? "SELF") {
      case "SELF":
        return log.author;
      case "TARGET":
        return log.targetType === "USER" ? (log.targetId ?? null) : null;
      case "OWNER": {
        if (log.meta?.owner) return log.meta.owner;
        if (log.targetType === "POST") {
          const p = await ds.Posts.getPost(log.targetId!);
          return p?.author?.address ?? null;
        }
        if (log.targetType === "COMMENT") {
          const c = await ds.Comments.getComment(log.targetId!);
          return c?.author?.address ?? null;
        }
        return null;
      }
      default:
        return null;
    }
  };

  const consume = async (log: LogEvt) => {
    await Promise.all([ensureRanks(), refreshPerkCache()]);

    const list = perkCache[log.type] ?? [];
    if (!list.length) return;

    for (const meta of list) {
      const userId = await beneficiary(log, meta.unlockRule);
      if (!userId) continue;

      const user = await ds.Users.getUser(userId);
      const need = rankOrder[meta.minRankId] ?? 0;
      const have = rankOrder[user?.currentRank ?? ""] ?? 0;
      if (have < need) {
        continue;
      }

      const state = await ds.Perks.getState(userId, meta.id);

      if (state?.status === "CLAIMED" && !isRepeatable(meta)) continue;

      const fp = fingerprint(log, meta.unlockRule.distinctBy as DistinctBy);
      const dup = fp && state?.seen?.includes(fp);

      if (meta.unlockRule.on === "ACTION") {
        if (dup) continue;

        await ds.Perks.upsertState({
          user: userId,
          perkId: meta.id,
          progress: 1,
          target: 1,
          status: "AVAILABLE",
          availableAt: Date.now(),
          cooldownSec: meta.executionRule.cooldownSec ?? 0,
          seen: fp ? [...(state?.seen ?? []), fp] : (state?.seen ?? []),
        });

        if (meta.executionRule.type === "IMMEDIATE") {
          await perkEngine({ ds, activity } as any).maybeAutoApply(
            meta.id,
            userId,
          );
        }
        continue;
      }

      if (meta.unlockRule.on === "ACTION_COUNT") {
        if (dup) continue;

        const next = (state?.progress ?? 0) + 1;
        const target = meta.unlockRule.times;
        const status = next >= target ? "AVAILABLE" : "LOCKED";

        await ds.Perks.upsertState({
          user: userId,
          perkId: meta.id,
          progress: next,
          target,
          status,
          availableAt: status === "AVAILABLE" ? Date.now() : 0,
          cooldownSec: meta.executionRule.cooldownSec ?? 0,
          seen: fp ? [...(state?.seen ?? []), fp] : (state?.seen ?? []),
        });

        if (status === "AVAILABLE" && meta.executionRule.type === "IMMEDIATE") {
          await perkEngine({ ds, activity } as any).maybeAutoApply(
            meta.id,
            userId,
          );
        }
      }
    }
  };

  return { consume };
};
