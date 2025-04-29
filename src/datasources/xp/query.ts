import { DataSourceManager } from '../manager';
import type { XPEntry }      from '../../models/xp';

export class XPQuery extends DataSourceManager {
    async getHistory(address: string, limit = 50, offset = 0): Promise<XPEntry[]> {
        const col = (this.fs('users') as any).ref
            .doc(address)
            .collection('xpHistory')
            .orderBy('createdAt', 'desc')
            .offset(offset)
            .limit(limit);

        const snap = await col.get();
        return snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as XPEntry) }));
    }
}
