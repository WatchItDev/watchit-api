import { DataSourceManager } from '../manager';
import { WhereFilterOp } from 'firebase-admin/firestore';
import { EventLog } from '@/schema/types';

type Clause = { field: string; op: WhereFilterOp; value: unknown };

export class LogsQuery extends DataSourceManager {
  eventsByUser(address: string, type?: string, limit = 50, offset = 0) {
    const clauses: Clause[] = [{ field: 'author', op: '==', value: address }];
    if (type) clauses.push({ field: 'type', op: '==', value: type });

    return this.fs<EventLog>('eventLogs')
      .query(clauses, {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      })
      .then((l) => l.slice(offset));
  }

  eventsByTarget(
    id: string,
    tgtType?: string,
    type?: string,
    limit = 50,
    offset = 0,
  ) {
    const clauses: Clause[] = [{ field: 'targetId', op: '==', value: id }];
    if (tgtType)
      clauses.push({ field: 'targetType', op: '==', value: tgtType });
    if (type) clauses.push({ field: 'type', op: '==', value: type });

    return this.fs<EventLog>('eventLogs')
      .query(clauses, {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      })
      .then((l) => l.slice(offset));
  }

  countEvents(type: string, idField: 'targetId' | 'author', id: string) {
    const clauses: Clause[] = [
      { field: 'type', op: '==', value: type },
      { field: idField, op: '==', value: id },
    ];
    return this.fs('eventLogs')
      .query(clauses)
      .then((r) => r.length);
  }
}
