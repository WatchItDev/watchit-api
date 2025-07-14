import type { Ctx } from '../manager';
import { perkEngine } from './perk';

export const progressEngine = ({ ds }: Pick<Ctx, 'ds'>) => {
    const cache: Record<string, any[]> = {};

    const load = async () => {
        if (Object.keys(cache).length) return;

        const catalog = await ds.Perks.getCatalog();

        catalog.forEach((p) => {
            if (
                (p.unlockRule.on === 'ACTION' || p.unlockRule.on === 'ACTION_COUNT') &&
                typeof p.unlockRule.action === 'string' && p.unlockRule.action.length > 0
            ) {
                const key = p.unlockRule.action;
                cache[key] = [...(cache[key] ?? []), p];
            }
        });
    };

    const consume = async (log: any) => {
        await load();

        const list = cache[log.type] ?? [];
        if (!list.length) return;

        const user = await ds.Users.getUser(log.author);
        if (!user) return;

        for (const meta of list) {
            if (meta.minRankId && user.currentRank && meta.minRankId > user.currentRank) continue;

            const state = await ds.Perks.getState(user.address, meta.id);

            if (meta.unlockRule.on === 'ACTION') {
                const s = !state
                    ? { status:'AVAILABLE', progress:1 }
                    : state.status === 'LOCKED'
                        ? { status:'AVAILABLE', progress:1 }
                        : null;
                if (!s) continue;

                await ds.Perks.upsertState({
                    user        : user.address,
                    perkId      : meta.id,
                    progress    : s.progress,
                    target      : 1,
                    status      : s.status as ('AVAILABLE' | 'LOCKED' | 'CLAIMED'),
                    availableAt : Date.now(),
                    cooldownSec : meta.executionRule.cooldownSec ?? 0,
                });

                if (meta.executionRule.type === 'IMMEDIATE') {
                    await perkEngine({ ds } as any).maybeAutoApply(meta.id, user.address);
                }

                continue;
            }

            if (meta.unlockRule.on === 'ACTION_COUNT') {
                const next    = (state?.progress ?? 0) + 1;
                const target  = meta.unlockRule.times;
                const status  = next >= target ? 'AVAILABLE' : 'LOCKED';

                await ds.Perks.upsertState({
                    user        : user.address,
                    perkId      : meta.id,
                    progress    : next,
                    target,
                    status,
                    availableAt : status === 'AVAILABLE' ? Date.now() : 0,
                    cooldownSec : meta.executionRule.cooldownSec ?? 0,
                });
            }
        }
    };

    return { consume };
};
