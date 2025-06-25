import { ServiceManager } from './manager';
import { PerkInput } from '@/schema/types';

export class PerksService extends ServiceManager {
    catalog    = () => this.ds.Perks.getCatalog();
    createPerk = (i: PerkInput)               => this.ds.Perks.createPerk(i);
    updatePerk = (id:string,p:Partial<PerkInput>) => this.ds.Perks.updatePerk(id,p);
    deletePerk = (id:string)                  => this.ds.Perks.deletePerk(id);
    async unlockedByUser(addr: string, limit = 50, offset = 0) {
        /* 1 · datos necesarios -------------------------------- */
        const [user, states, catalog, ranks] = await Promise.all([
            this.ds.Users.getUser(addr),
            this.ds.Perks.statesByUser(addr, limit, offset),
            this.ds.Perks.getCatalog(),
            this.ds.Ranks.catalog(),
        ]);
        if (!user) return [];

        /* 2 · mapa rápido para meta y orden ------------------- */
        const meta = Object.fromEntries(catalog.map(p => [p.id, p]));
        const order = Object.fromEntries(ranks.map(r => [r.id, r.order]));
        const userOrd = order[user.currentRank ?? 'watcher'] ?? 0;

        /* 3 · fusionar + filtrar ------------------------------ */
        const now = Date.now();
        return states.reduce((list, s) => {
            const m = meta[s.perkId];
            if (!m) return list;                       // perk borrado
            if ((order[m.minRankId] ?? 0) > userOrd) return list; // rango superior

            list.push({
                ...m,
                executionRule : { ...m.executionRule, cooldownSec: m.executionRule.cooldownSec ?? 0 },
                status        : s.status,
                availableAt   : s.availableAt,
                collectedAt   : s.collectedAt ?? null,
                cooldownRemaining: s.status === 'CLAIMED'
                    ? Math.max(0, Math.floor((s.availableAt - now) / 1000))
                    : 0,
            });
            return list;
        }, [] as any[]);
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
