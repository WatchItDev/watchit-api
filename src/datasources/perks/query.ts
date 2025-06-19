import { DataSourceManager }  from '../manager';
import type { UnlockedPerk }  from '../../models/unlockedPerk';
import type { PerkCatalog }   from '../../models/perk';

export class PerksQuery extends DataSourceManager {
    getCatalog = () => this.fs<PerkCatalog>('perksCatalog').list(500);

    async unlockedByUser(user: string, limit = 50, offset = 0) {
        return this.fs<UnlockedPerk>('unlockedPerks')
            .query([{ field: 'user', op: '==', value: user }],
                { orderBy: { field: 'createdAt', direction: 'desc' }, limit })
            .then(l => l.slice(offset));
    }

    progressOf(user: string, perkId: string) {
        // dailyProgress may have multiple windows (today, week)
        return this.fs('dailyProgress')
            .get(`${perkId}-${user}`); // windowKey resolved por servicio
    }
}
