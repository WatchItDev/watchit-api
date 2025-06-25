import { DataSourceManager } from '../manager';
import { UnlockedPerk, makeUnlockedPerk } from '../../models/unlockedPerk';
import {PerkInput, Perk, Maybe} from '../../schema/types';
import {makePerk} from "../../models/perk";

export class PerksCommands extends DataSourceManager {
    createPerk = (i: PerkInput) =>
        this.fs<Perk>('perks').create(i.id, makePerk(i))

    updatePerk = (id: string, p: Partial<PerkInput>) =>
        this.fs('perks')
            .update(id, { ...p, updatedAt: Date.now() })
            .then(() => this.fs<Perk>('perks').get(id)!)

    deletePerk = (id: string) =>
        this.fs('perks').delete(id).then(() => true);

    async upsertState(s: {
        user: string; perkId: string;
        progress: number; target: number;
        status: 'LOCKED'|'AVAILABLE'|'CLAIMED';
        availableAt: number; cooldownSec: number;
    }) {
        const dao = this.fs<UnlockedPerk>('userPerkState');
        const id  = `${s.user}-${s.perkId}`;
        const exists = await dao.exists(id);
        const rec = makeUnlockedPerk(s);
        exists ? await dao.update(id, rec) : await dao.create(id, rec);
    }

    expiredCooldowns = (now: number) =>
        this.fs<UnlockedPerk>('userPerkState')
            .query([
                { field:'status',      op:'==', value:'CLAIMED' },
                { field:'availableAt', op:'<=', value: now },
            ], { limit: 500 });

    async claimPerk(user: string, perkId: string): Promise<boolean> {
        const dao = this.fs<UnlockedPerk>('userPerkState');
        const [doc] = await dao.query([
            { field:'user',   op:'==', value:user },
            { field:'perkId', op:'==', value:perkId },
        ], { limit: 1 });

        if (!doc) return false;
        if (doc.collectedAt) return false;
        if (Date.now() < doc.availableAt) return false;

        await dao.update(doc.id, { collectedAt: Date.now(), status:'CLAIMED' });
        return true;
    }

    refreshCooldown = (id: string, next: number) =>
        this.fs('userPerkState').update(id, {
            status: 'LOCKED',
            collectedAt: null,
            availableAt: next,
        });
}
