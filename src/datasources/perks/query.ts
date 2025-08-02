import { DataSourceManager } from '../manager';
import { UnlockedPerk } from '../../models/unlockedPerk';
import {Perk} from "@/schema/types";

export class PerksQuery extends DataSourceManager {
    getCatalog = () => this.fs<Perk>('perks').list(500);
    statesByUser = (u: string, l=50, o=0) =>
        this.fs<UnlockedPerk>('userPerkState')
            .query([{ field:'user', op:'==', value:u }],
                { orderBy:{ field:'createdAt', direction:'desc' }, limit:l })
            .then(r => r.slice(o));
    getState = (u: string, p: string) =>
        this.fs<UnlockedPerk>('userPerkState').get(`${u}-${p}`);
    hasPerk = async (u: string, p: string): Promise<boolean> =>
        !!(await this.getState(u, p));
}
