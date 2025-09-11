import { Actor, DistinctBy } from '../../models/perk';
import type { Ctx } from '../manager';
import { perks } from './perk';

const REFRESH_INTERVAL = +(process.env.API_REFRESH_PERK_CACHE_SECONDS || 5_000);

export interface LogEvt {
  type: string;
  author: string;
  targetId?: string;
  targetType?: string;
  meta?: Record<string, any>;
}

const fingerprint = (log: LogEvt, distinctBy?: DistinctBy | null): string | null => {
  switch (distinctBy) {
    case 'TARGET':
      return log.targetId ?? null;
    case 'USER':
      return log.author;
    default:
      return null;
  }
};

const isRepeatable = (meta: any): boolean =>
  meta.executionRule.type === 'ON_COOLDOWN' ||
  (meta.hooks ?? []).some((h: any) => h.type === 'RELOCK' || h.type === 'RESET_PROGRESS');

const getBeneficiary = async (log: LogEvt, rule: any, ds: Ctx['ds']): Promise<string | null> => {
  const actor = (rule.actor as Actor) ?? 'SELF';
  if (actor === 'SELF') return log.author;
  if (actor === 'TARGET') return log.targetType === 'USER' ? (log.targetId ?? null) : null;
  if (actor === 'OWNER') {
    if (log.meta?.owner) return log.meta.owner;
    if (log.targetType === 'POST') {
      const p = await ds.Posts.getPost(log.targetId!);
      return p?.author?.address ?? null;
    }
    if (log.targetType === 'COMMENT') {
      const c = await ds.Comments.getComment(log.targetId!);
      return c?.author?.address ?? null;
    }
    return null;
  }
  return null;
};

const ensureRanks = async (ds: Ctx['ds'], rankOrder: Record<string, number>) => {
  if (Object.keys(rankOrder).length) return;
  const ranks = await ds.Ranks.catalog();
  ranks.sort((a, b) => a.order - b.order);
  Object.assign(rankOrder, Object.fromEntries(ranks.map((r) => [r.id, r.order])));
};

const refreshPerkCache = async (
  ds: Ctx['ds'],
  perkCache: Record<string, any[]>,
  lastLoadRef: { value: number },
) => {
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
}: {
  perkMeta: any;
  userId: string;
  perkState: any;
  fp: string | null;
  ds: Ctx['ds'];
  activity: Ctx['activity'];
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
    await perks({ ds, activity } as any).autoApply(perkMeta.id, userId);
  }
};

const handleActionCount = async ({
  perkMeta,
  userId,
  perkState,
  fp,
  ds,
  activity,
}: {
  perkMeta: any;
  userId: string;
  perkState: any;
  fp: string | null;
  ds: Ctx['ds'];
  activity: Ctx['activity'];
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
    await perks({ ds, activity } as any).autoApply(perkMeta.id, userId);
  }
};

export const progress = ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>) => {
  const perkCache: Record<string, any[]> = {};
  const rankOrder: Record<string, number> = {};
  const lastLoadRef = { value: 0 };

  const consume = async (log: LogEvt) => {
    await Promise.all([ensureRanks(ds, rankOrder), refreshPerkCache(ds, perkCache, lastLoadRef)]);
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
      const fp = fingerprint(log, perkMeta.unlockRule.distinctBy as DistinctBy);

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

export type ProgressLibType = ReturnType<typeof progress>;
