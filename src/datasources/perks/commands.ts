import { DataSourceManager }  from '../manager';
import { makeUnlockedPerk, UnlockedPerk } from '@/models/unlockedPerk';
import {PerkCatalogInput, Perk} from "@/schema/types";

export class PerksCommands extends DataSourceManager {
    async createUnlockedPerk(p: {
        user:string; perkId:string; availableAt:number; cooldownSec:number;
    }): Promise<UnlockedPerk> {
        const rec = makeUnlockedPerk(p);
        await this.fs<UnlockedPerk>('unlockedPerks').create(rec.id, rec);
        return rec;
    }

    /** Marks perk as collected – idempotent */
    async claimPerk(user: string, perkId: string): Promise<boolean> {
        const dao = this.fs<UnlockedPerk>('unlockedPerks');
        const [doc] = await dao.query([
            { field: 'user',   op: '==', value: user },
            { field: 'perkId', op: '==', value: perkId },
        ], { limit: 1 });

        if (!doc) return false;
        if (doc.collectedAt) return false;
        if (Date.now() < doc.availableAt) return false;

        await dao.update(doc.id, { collectedAt: Date.now() });
        return true;
    }

    /** Resets availableAt when cooldown end */
    async refreshCooldown(uPerkId: string, nextAvailableAt: number) {
        await this.fs('unlockedPerks').update(uPerkId, { availableAt: nextAvailableAt, collectedAt: null });
    }

    createPerk  = (i: PerkCatalogInput)                   =>
        this.fs<Perk>('perksCatalog').create(i.id, i);
    updatePerk  = (id:string,p:Partial<PerkCatalogInput>) =>
        this.fs('perksCatalog').update(id,p).then(() => this.fs<Perk>('perksCatalog').get(id)!);
    deletePerk  = (id:string)                            =>
        this.fs('perksCatalog').delete(id).then(()=>true);
}
