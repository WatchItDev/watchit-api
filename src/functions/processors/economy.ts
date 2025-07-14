import { makeXpEntry } from '../../models/xp';
import type {Ctx} from "@/functions/manager";

/**
 * Pure economic primitives: XP, MMC, USDT (coming soon).
 * Bound to ctx once via ./manager.ts
 */
export const economy = ({ ds, activity }: Pick<Ctx,'ds' | 'ext' | 'activity'>) => ({
    addXp: async (
        addr: string,
        amount: number,
        action = 'SYS',
        description = '',
    ) => {
        const u = await ds.Users.getUser(addr);
        if (!u) return;

        await ds.XP.addEntry(
            makeXpEntry({
                user: addr,
                action,
                description,
                amount,
                before: u.xpBalance,
                totalBefore: u.xpTotal,
            }),
        );
        await activity.xpGained(addr, amount)
    },

    transferMMC: async (addr: string, amount: number) => {
        try {
            await ds.SynapseDS.transfer(addr, amount);
            await activity.mmcTransfer(addr, amount)
            console.log(`💸  ${amount} MMC sent to ${addr}`);
        } catch (e) {
            console.error('MMC transfer failed', e);
        }
    },
});
