import { DataSourceManager } from '../manager';
import { XPEntry }           from '../../models/xp';

export class XPCommands extends DataSourceManager {
    async addEntry(address: string, entry: XPEntry): Promise<void> {
        const ref = (this.fs('users') as any).ref
            .doc(address)
            .collection('xpHistory');
        await ref.add(entry);
    }
}
