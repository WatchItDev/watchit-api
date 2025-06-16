import { ServiceManager }       from './manager';
import {PerkCatalogInput} from "@/schema/types";

export class PerksService extends ServiceManager {
    catalog       = ()                              => this.ds.Perks.getCatalog();
    createPerk    = (i: PerkCatalogInput)           => this.ds.Perks.createPerk(i);
    updatePerk    = (id:string,p:Partial<PerkCatalogInput>) =>
        this.ds.Perks.updatePerk(id,p);
    deletePerk    = (id:string)                     => this.ds.Perks.deletePerk(id);

    unlockedByUser= (a:string,l=50,o=0)             => this.ds.Perks.unlockedByUser(a,l,o);

    /** claim ⇒ marca collected y dispara EventLog - el trigger premiará */
    async claim(addr: string, perkId: string) {
        const ok = await this.ds.Perks.claimPerk(addr, perkId);
        if (!ok) return false;

        await this.ds.Logs.logEvent(addr, {
            type:       'PERK_CLAIM',
            targetId:   perkId,
            targetType: 'PERK',
        });
        return true;
    }
}
