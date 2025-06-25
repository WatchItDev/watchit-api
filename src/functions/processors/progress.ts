import type { Ctx } from '../manager';

export const progressEngine = ({ ds }: Pick<Ctx, 'ds'>) => {
    const cache: Record<string, any[]> = {};

    /* -------------------------------------------------------- */
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

    /* -------------------------------------------------------- */
    const consume = async (log: any) => {
        await load();

        const list = cache[log.type] ?? [];
        if (!list.length) return;

        const user = await ds.Users.getUser(log.author);
        if (!user) return;

        for (const meta of list) {
            if (meta.minRankId && user.currentRank && meta.minRankId > user.currentRank) continue;

            const state = await ds.Perks.getState(user.address, meta.id);

            /* -------- ACTION (primera vez) ----------------------- */
            if (meta.unlockRule.on === 'ACTION' && !state) {
                await ds.Perks.upsertState({
                    user        : user.address,
                    perkId      : meta.id,
                    progress    : 1,
                    target      : 1,
                    status      : 'AVAILABLE',
                    availableAt : Date.now(),
                    cooldownSec : meta.executionRule.cooldownSec ?? 0,
                });
                continue;
            }

            /* -------- ACTION_COUNT ------------------------------- */
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
