import { economy } from './economy'
import type {Ctx} from "@/functions/manager";
import {PerkHook} from "@/models/perk";

export const perkEngine = ({ ds, ext, activity }: Pick<Ctx,'ds' | 'ext' | 'activity'>) => {
    const eco = economy({ ds, ext, activity })

    const runHooks = async (
        hooks: PerkHook[]|undefined,
        when:'BEFORE'|'AFTER',
        ctx:{ meta:any; user:string; state:any }
    ) => {
        for (const h of hooks?.filter(x => x.when === when) ?? []) {
            switch (h.type) {
                case 'RESET_PROGRESS':
                    await ds.Perks.upsertState({
                        user:ctx.user, perkId:ctx.meta.id,
                        progress:0, target:ctx.state.target,
                        status:'LOCKED', availableAt:0,
                        cooldownSec:ctx.state.cooldownSec,
                        seen:[]
                    });
                    break;
                case 'RELOCK':
                    await ds.Perks.upsertState({
                        ...ctx.state,
                        status:'LOCKED',
                        progress: 0,
                        availableAt:Date.now()+ctx.state.cooldownSec*1000,
                    });
                    break;
            }
        }
    };

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

    const apply = async (meta:any, addr:string) => {
        const state = await ds.Perks.getState(addr, meta.id);
        await runHooks(meta.hooks,'BEFORE',{meta,user:addr,state});
        await applyReward(meta, addr);
        await runHooks(meta.hooks,'AFTER',{meta,user:addr,state});
    };

    return {
        maybeAutoApply: async (perkId: string, addr: string) => {
            const meta   = (await ds.Perks.getCatalog()).find((p: any) => p.id === perkId)
            if (!meta || meta.executionRule.type !== 'IMMEDIATE') return

            const state  = await ds.Perks.getState(addr, perkId)
            if (!state || state.status !== 'AVAILABLE') return
            await apply(meta, addr)

            const hasRelock = meta.hooks?.some(h => h.when === 'AFTER' && h.type === 'RELOCK');
            if (!hasRelock) {
                await ds.Perks.claimPerk(addr, perkId);
            }
        },

        claim: async (perkId: string, addr: string) => {
            const meta = (await ds.Perks.getCatalog())
                .find((p: any) => p.id === perkId)
            if (meta) await apply(meta, addr)
        },
    }
}
