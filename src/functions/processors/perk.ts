import { economy } from './economy';

/**
 * Executes perk rewards either automatically (IMMEDIATE)
 * or when the user claims.
 */
export const perkEngine = ({ ds, ext }: { ds: any; ext: any }) => {
    const eco = economy({ ds, ext });

    const apply = async (r: any, addr: string) => {
        switch (r.action) {
            case 'ADD_XP':
                await eco.addXp(addr, r.amount, 'PERK_REWARD');
                break;
            case 'ADD_MMC':
                await eco.transferMMC(addr, r.amount);
                break;
        }
    };

    return {
        maybeAutoApply: async (perkId: string, addr: string) => {
            const meta = (await ds.Perks.getCatalog()).find((p: any) => p.id === perkId);
            if (meta?.executionRule.type === 'IMMEDIATE') await apply(meta.reward, addr);
        },

        claim: async (perkId: string, addr: string) => {
            const meta = (await ds.Perks.getCatalog()).find((p: any) => p.id === perkId);
            if (meta) await apply(meta.reward, addr);
        },
    };
};
