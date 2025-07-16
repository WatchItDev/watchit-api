import type { Ctx } from '../manager';
import { perkEngine } from './perk';
import { Actor, DistinctBy } from '../../models/perk';

export interface LogEvt {
    type: string;
    author: string;
    targetId?: string;
    targetType?: string;
    meta?: Record<string, any>;
}

const fingerprint = (
    log: LogEvt,
    distinctBy: DistinctBy | undefined,
): string | null =>
    distinctBy === 'TARGET'
        ? log.targetId ?? null
        : distinctBy === 'USER'
            ? log.author
            : null;

export const progressEngine = ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>) => {
    const cache: Record<string, any[]> = {};

    const load = async () => {
        if (Object.keys(cache).length) return;

        const catalog = await ds.Perks.getCatalog();

        catalog.forEach((p) => {
            if (
                (p.unlockRule.on === 'ACTION' ||
                    p.unlockRule.on === 'ACTION_COUNT') &&
                typeof p.unlockRule.action === 'string' &&
                p.unlockRule.action.length > 0
            ) {
                const key = p.unlockRule.action;
                cache[key] = [...(cache[key] ?? []), p];
            }
        });
    };

    const beneficiary = async (log: LogEvt, rule: any): Promise<string | null> => {
        switch ((rule.actor as Actor) ?? 'SELF') {
            case 'SELF':
                return log.author;
            case 'TARGET':
                return log.targetType === 'USER' ? log.targetId ?? null : null;
            case 'OWNER':
                if (log.meta?.owner) return log.meta.owner;
                if (log.targetType === 'POST') {
                    const post = await ds.Posts.getPost(log.targetId!);
                    return post?.author?.address ?? null;
                }
                if (log.targetType === 'COMMENT') {
                    const c = await ds.Comments.getComment(log.targetId!);
                    return c?.author?.address ?? null;
                }
                return null;
            default:
                return null;
        }
    };

    const consume = async (log: LogEvt) => {
        await load();

        const list = cache[log.type] ?? [];
        if (!list.length) return;

        for (const meta of list) {
            const userId = await beneficiary(log, meta.unlockRule);
            if (!userId) continue;

            const user = await ds.Users.getUser(userId);
            if (!user) continue;
            if (meta.minRankId && user.currentRank && meta.minRankId > user.currentRank)
                continue;

            const state = await ds.Perks.getState(userId, meta.id);
            const dBy = meta.unlockRule.distinctBy as DistinctBy | undefined;
            const fp = fingerprint(log, dBy);
            const alreadyCounted = fp && state?.seen?.includes(fp);

            if (meta.unlockRule.on === 'ACTION') {
                if (alreadyCounted) continue;

                await ds.Perks.upsertState({
                    user        : userId,
                    perkId      : meta.id,
                    progress    : 1,
                    target      : 1,
                    status      : 'AVAILABLE',
                    availableAt : Date.now(),
                    cooldownSec : meta.executionRule.cooldownSec ?? 0,
                    seen: fp ? [...(state?.seen ?? []), fp] : state?.seen ?? [],
                });

                if (meta.executionRule.type === 'IMMEDIATE') {
                    await perkEngine({ ds, activity } as any).maybeAutoApply(meta.id, userId);
                }

                continue;
            }

            if (meta.unlockRule.on === 'ACTION_COUNT') {
                if (alreadyCounted) continue;

                const next    = (state?.progress ?? 0) + 1;
                const target  = meta.unlockRule.times;
                const status  = next >= target ? 'AVAILABLE' : 'LOCKED';

                await ds.Perks.upsertState({
                    user        : userId,
                    perkId      : meta.id,
                    progress    : next,
                    target,
                    status,
                    availableAt : status === 'AVAILABLE' ? Date.now() : 0,
                    cooldownSec : meta.executionRule.cooldownSec ?? 0,
                    seen: fp ? [...(state?.seen ?? []), fp] : state?.seen ?? [],
                });
            }
        }
    };

    return { consume };
};
