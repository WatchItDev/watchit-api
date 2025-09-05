'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.progress = void 0;
const perk_1 = require('./perk');
const REFRESH_INTERVAL = +(process.env.API_REFRESH_PERK_CACHE_SECONDS || 5_000);
const fingerprint = (log, distinctBy) => {
  switch (distinctBy) {
    case 'TARGET':
      return log.targetId ?? null;
    case 'USER':
      return log.author;
    default:
      return null;
  }
};
const isRepeatable = (meta) =>
  meta.executionRule.type === 'ON_COOLDOWN' ||
  (meta.hooks ?? []).some(
    (h) => h.type === 'RELOCK' || h.type === 'RESET_PROGRESS',
  );
const getBeneficiary = async (log, rule, ds) => {
  const actor = rule.actor ?? 'SELF';
  if (actor === 'SELF') return log.author;
  if (actor === 'TARGET')
    return log.targetType === 'USER' ? (log.targetId ?? null) : null;
  if (actor === 'OWNER') {
    if (log.meta?.owner) return log.meta.owner;
    if (log.targetType === 'POST') {
      const p = await ds.Posts.getPost(log.targetId);
      return p?.author?.address ?? null;
    }
    if (log.targetType === 'COMMENT') {
      const c = await ds.Comments.getComment(log.targetId);
      return c?.author?.address ?? null;
    }
    return null;
  }
  return null;
};
const ensureRanks = async (ds, rankOrder) => {
  if (Object.keys(rankOrder).length) return;
  const ranks = await ds.Ranks.catalog();
  ranks.sort((a, b) => a.order - b.order);
  Object.assign(
    rankOrder,
    Object.fromEntries(ranks.map((r) => [r.id, r.order])),
  );
};
const refreshPerkCache = async (ds, perkCache, lastLoadRef) => {
  if (Date.now() - lastLoadRef.value < REFRESH_INTERVAL) return;
  const catalog = await ds.Perks.getCatalog();
  Object.keys(perkCache).forEach((k) => delete perkCache[k]);
  for (const p of catalog) {
    if (
      (p.unlockRule.on === 'ACTION' || p.unlockRule.on === 'ACTION_COUNT') &&
      typeof p.unlockRule.action === 'string'
    ) {
      (perkCache[p.unlockRule.action] ??= []).push(p);
    }
  }
  lastLoadRef.value = Date.now();
};
const handleAction = async ({
  perkMeta,
  userId,
  perkState,
  fp,
  ds,
  activity,
}) => {
  if (fp && perkState?.seen?.includes(fp)) return;
  await ds.Perks.upsertState({
    user: userId,
    perkId: perkMeta.id,
    progress: 1,
    target: 1,
    status: 'AVAILABLE',
    availableAt: Date.now(),
    cooldownSec: perkMeta.executionRule.cooldownSec ?? 0,
    seen: fp ? [...(perkState?.seen ?? []), fp] : (perkState?.seen ?? []),
  });
  if (perkMeta.executionRule.type === 'IMMEDIATE') {
    await (0, perk_1.perks)({ ds, activity }).maybeAutoApply(
      perkMeta.id,
      userId,
    );
  }
};
const handleActionCount = async ({
  perkMeta,
  userId,
  perkState,
  fp,
  ds,
  activity,
}) => {
  if (fp && perkState?.seen?.includes(fp)) return;
  const nextProgress = (perkState?.progress ?? 0) + 1;
  const targetCount = perkMeta.unlockRule.times;
  const status = nextProgress >= targetCount ? 'AVAILABLE' : 'LOCKED';
  await ds.Perks.upsertState({
    user: userId,
    perkId: perkMeta.id,
    progress: nextProgress,
    target: targetCount,
    status,
    availableAt: status === 'AVAILABLE' ? Date.now() : 0,
    cooldownSec: perkMeta.executionRule.cooldownSec ?? 0,
    seen: fp ? [...(perkState?.seen ?? []), fp] : (perkState?.seen ?? []),
  });
  if (status === 'AVAILABLE' && perkMeta.executionRule.type === 'IMMEDIATE') {
    await (0, perk_1.perks)({ ds, activity }).maybeAutoApply(
      perkMeta.id,
      userId,
    );
  }
};
const progress = ({ ds, activity }) => {
  const perkCache = {};
  const rankOrder = {};
  const lastLoadRef = { value: 0 };
  const consume = async (log) => {
    await Promise.all([
      ensureRanks(ds, rankOrder),
      refreshPerkCache(ds, perkCache, lastLoadRef),
    ]);
    const perksForAction = perkCache[log.type] ?? [];
    if (!perksForAction.length) return;
    for (const perkMeta of perksForAction) {
      const userId = await getBeneficiary(log, perkMeta.unlockRule, ds);
      if (!userId) continue;
      const user = await ds.Users.getUser(userId);
      const requiredRank = rankOrder[perkMeta.minRankId] ?? 0;
      const userRank = rankOrder[user?.currentRank ?? ''] ?? 0;
      if (userRank < requiredRank) continue;
      const perkState = await ds.Perks.getState(userId, perkMeta.id);
      if (perkState?.status === 'CLAIMED' && !isRepeatable(perkMeta)) continue;
      const fp = fingerprint(log, perkMeta.unlockRule.distinctBy);
      if (perkMeta.unlockRule.on === 'ACTION') {
        await handleAction({
          perkMeta,
          userId,
          perkState,
          fp,
          ds,
          activity,
        });
      } else if (perkMeta.unlockRule.on === 'ACTION_COUNT') {
        await handleActionCount({
          perkMeta,
          userId,
          perkState,
          fp,
          ds,
          activity,
        });
      }
    }
  };
  return { consume };
};
exports.progress = progress;
//# sourceMappingURL=progress.js.map
