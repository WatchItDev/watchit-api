import { ServiceManager } from './manager';
import { PerkInput } from '@/schema/types';

export class PerksService extends ServiceManager {
    catalog    = () => this.ds.Perks.getCatalog();
    createPerk = (i: PerkInput)               => this.ds.Perks.createPerk(i);
    updatePerk = (id:string,p:Partial<PerkInput>) => this.ds.Perks.updatePerk(id,p);
    deletePerk = (id:string)                  => this.ds.Perks.deletePerk(id);
    async unlockedByUser(addr: string, limit = 50, offset = 0) {
        const [user, states, catalog] = await Promise.all([
            this.ds.Users.getUser(addr),
            this.ds.Perks.statesByUser(addr, limit, offset),
            this.ds.Perks.getCatalog(),
        ]);
        if (!user) return [];

        const meta = Object.fromEntries(catalog.map(p => [p.id, p]));

        return states
            .map((s) => {
                const p = meta[s.perkId];
                if (!p) return null;

                return {
                    ...s,
                    perk: {
                        ...p,
                        cooldownRemaining:
                            s.status === 'CLAIMED'
                                ? Math.max(0, Math.floor((s.availableAt - Date.now()) / 1000))
                                : 0,
                        executionRule: {
                            ...p.executionRule,
                            cooldownSec: p.executionRule.cooldownSec ?? 0,   // ← default
                        },
                    },
                };
            })
            .filter(Boolean);
    }
    async claim(addr: string, perkId: string) {
        const ok = await this.ds.Perks.claimPerk(addr, perkId);
        if (!ok) return false;

        await this.ds.Logs.logEvent(addr, {
            type:'PERK_CLAIM', targetId:perkId, targetType:'PERK',
        });
        return true;
    }
    resetCooldowns = async () => {
        const now = Date.now();
        const rows = await this.ds.Perks.expiredCooldowns(now);
        await Promise.all(
            rows.map(r =>
                this.ds.Perks.refreshCooldown(r.id, now + r.cooldownSec*1000)),
        );
        return rows.length;
    };
}
