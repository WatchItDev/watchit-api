import { economy } from './economy'
import type {Ctx} from "@/functions/manager";

export const perkEngine = ({ ds, ext, activity }: Pick<Ctx,'ds' | 'ext' | 'activity'>) => {
    const eco = economy({ ds, ext, activity })

    const applyReward = async (meta: any, addr: string) => {
        const r = meta.reward
        switch (r.action) {
            case 'ADD_XP':
                await eco.addXp(
                    addr,
                    r.amount,
                    'PERK_REWARD',
                    meta.name,
                )
                break
            case 'ADD_MMC':
                await eco.transferMMC(addr, r.amount)
                break
        }
    }

    return {
        maybeAutoApply: async (perkId: string, addr: string) => {
            const meta   = (await ds.Perks.getCatalog()).find((p: any) => p.id === perkId)
            if (!meta || meta.executionRule.type !== 'IMMEDIATE') return

            const state  = await ds.Perks.getState(addr, perkId)
            if (!state || state.status !== 'AVAILABLE') return
            await applyReward(meta, addr)
            await ds.Perks.claimPerk(addr, perkId)
        },

        claim: async (perkId: string, addr: string) => {
            const meta = (await ds.Perks.getCatalog())
                .find((p: any) => p.id === perkId)
            if (meta) await applyReward(meta, addr)
        },
    }
}
