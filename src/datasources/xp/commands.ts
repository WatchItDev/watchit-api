import { DataSourceManager } from '../manager'
import type { XPEntry }       from '../../models/xp'

export class XPCommands extends DataSourceManager {
    async addEntry(entry: XPEntry): Promise<void> {
        await this.fs('xpEntries').create(entry.id!, entry)
    }
}
