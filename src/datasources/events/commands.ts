import { makeNewLog } from '../../models/log';
import { EventLog } from '../../schema/types';
import { DataSourceManager } from '../manager';

export class LogsCommands extends DataSourceManager {
  async logEvent(author: string, data: Omit<EventLog, 'id' | 'createdAt'>) {
    const record = makeNewLog({ ...data, author });
    await this.fs<EventLog>('eventLogs').create(record.id, record);
  }
}
