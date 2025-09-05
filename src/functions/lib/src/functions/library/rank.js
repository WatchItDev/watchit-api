'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ranks = void 0;
// rankEngine.ts
const rewards_1 = require('./rewards');
const tryActivity = async (activity, key, ...args) => {
  try {
    const fn = activity?.[key];
    if (typeof fn === 'function') await fn(...args);
  } catch {
    /* best-effort: don't break flow */
  }
};
/**
 * Provides rank management functionality for users, including rank progression,
 * perk unlocking, and cache management.
 *
 * @param ds - Data source ports for accessing rank, user, and perk data.
 * @param ext - External dependencies or context.
 * @param activity - Activity tracking or logging interface.
 * @returns An object with methods for rank progression and cache management:
 * - maybeRankUp(userAddr): Promotes the user to the next rank if eligible, unlocks perks, and logs activity.
 * - resetCache(): Clears in-memory rank and order caches, useful if rank catalog changes at runtime.
 *
 * @remarks
 * - Handles initial rank assignment for new users.
 * - Unlocks perks based on rank progression and configured rules.
 * - Ensures rank and perk state consistency across user actions.
 */
const ranks = ({ ds, ext, activity }) => {
  // Locally narrow ports for this module
  const ports = ds;
  const rewardsHandler = (0, rewards_1.rewards)({ ds, ext, activity });
  const acts = activity;
  let rankCache = null;
  let orderById = Object.create(null);
  const getRanks = async () => {
    if (rankCache) return rankCache;
    rankCache = await ports.Ranks.catalog();
    rankCache.sort((a, b) => a.order - b.order);
    orderById = Object.fromEntries(rankCache.map((r) => [r.id, r.order]));
    return rankCache;
  };
  const unlockPerksForRank = async (rankId, user) => {
    const [catalog, ranks] = await Promise.all([
      ports.Perks.getCatalog(),
      getRanks(),
    ]);
    if (!orderById || Object.keys(orderById).length === 0) {
      for (const r of ranks) orderById[r.id] = r.order;
    }
    const instant = catalog.filter(
      (p) => p.unlockRule.on === 'RANK_UP' && p.unlockRule.rankId === rankId,
    );
    const seed = catalog.filter(
      (p) =>
        (orderById[p.minRankId] ?? 0) <= (orderById[rankId] ?? 0) &&
        p.unlockRule.on !== 'RANK_UP',
    );
    const now = Date.now();
    await Promise.all(
      instant.map((p) =>
        ports.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: 0,
          status: 'AVAILABLE',
          availableAt: now,
          cooldownSec:
            p.executionRule.type === 'ON_COOLDOWN'
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
          p.unlockRule.on === 'ACTION_COUNT' ? (p.unlockRule.times ?? 1) : 1;
        await ports.Perks.upsertState({
          user,
          perkId: p.id,
          progress: 0,
          target: initTarget,
          status: 'LOCKED',
          availableAt: 0,
          cooldownSec: p.executionRule.cooldownSec ?? 0,
          seen: [],
        });
      }),
    );
  };
  const bootstrapFirstRank = async (userAddr, ranks) => {
    if (ranks.length === 0) return; // no ranks configured
    const first = ranks[0];
    await Promise.all([
      ports.Users.updateUser(userAddr, { currentRank: first.id }),
      ports.Ranks.addUserRank(userAddr, first.id),
    ]);
    await unlockPerksForRank(first.id, userAddr);
    await tryActivity(acts, 'rankUp', userAddr, first.id);
  };
  const promoteNextRank = async (userAddr, u, ranks) => {
    const idx = ranks.findIndex((r) => r.id === u.currentRank);
    if (idx < 0) return;
    const next = ranks[idx + 1];
    if (u.xpTotal < next.minXp) return;
    await Promise.all([
      ports.Users.updateUser(userAddr, { currentRank: next.id }),
      ports.Ranks.addUserRank(userAddr, next.id),
    ]);
    await unlockPerksForRank(next.id, userAddr);
    await tryActivity(acts, 'rankUp', userAddr, next.id);
    await rewardsHandler.addXp(
      userAddr,
      10,
      rewards_1.XPAction.RANK_UP_BONUS,
      `Reached ${next.name}`,
    );
  };
  return {
    maybeRankUp: async (userAddr) => {
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
exports.ranks = ranks;
//# sourceMappingURL=rank.js.map
