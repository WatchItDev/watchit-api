import { economy }          from './economy';

export const rankEngine = ({ ds, ext }: { ds: any; ext: any }) => {
    const eco = economy({ ds, ext });

    const unlockPerksForRank = async (rankId: string, user: string) => {
        const catalog = await ds.Perks.getCatalog();

        const toUnlock = catalog.filter(
            (p: any) =>
                p.unlockRule.on === 'RANK_UP' &&
                p.unlockRule.rankId === rankId &&
                p.minRankId <= rankId,
        );

        if (!toUnlock.length) return;

        const now = Date.now();
        await Promise.all(
            toUnlock.map((p: any) =>
                ds.Perks.createUnlockedPerk({
                    user,
                    perkId: p.id,
                    availableAt: now,
                    cooldownSec:
                        p.executionRule.type === 'ON_COOLDOWN'
                            ? p.executionRule.cooldownSec
                            : 0,
                }),
            ),
        );
    };

    return {
        maybeRankUp: async (userAddr: string) => {
            const u = await ds.Users.getUser(userAddr);
            if (!u) return;

            const { current, next } = await ds.Ranks.evaluate(u.xpTotal);
            if (!next || u.xpTotal < next.minXp) return;

            await Promise.all([
                ds.Users.updateUser(userAddr, { currentRank: next.id }),
                ds.Ranks.addUserRank(userAddr, next.id),
            ]);

            await unlockPerksForRank(next.id, userAddr);

            await eco.addXp(userAddr, 10, 'RANK_UP_BONUS', `Reached ${next.name}`);

            console.log(`🏅  ${userAddr} promoted → ${next.name}`);
        },
    };
};
