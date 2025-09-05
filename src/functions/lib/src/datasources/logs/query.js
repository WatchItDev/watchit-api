'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LogsQuery = void 0;
const manager_1 = require('../manager');
class LogsQuery extends manager_1.DataSourceManager {
  eventsByUser(address, type, limit = 50, offset = 0) {
    const clauses = [{ field: 'author', op: '==', value: address }];
    if (type) clauses.push({ field: 'type', op: '==', value: type });
    return this.fs('eventLogs')
      .query(clauses, {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      })
      .then((l) => l.slice(offset));
  }
  eventsByTarget(id, tgtType, type, limit = 50, offset = 0) {
    const clauses = [{ field: 'targetId', op: '==', value: id }];
    if (tgtType)
      clauses.push({ field: 'targetType', op: '==', value: tgtType });
    if (type) clauses.push({ field: 'type', op: '==', value: type });
    return this.fs('eventLogs')
      .query(clauses, {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      })
      .then((l) => l.slice(offset));
  }
  countEvents(type, idField, id) {
    const clauses = [
      { field: 'type', op: '==', value: type },
      { field: idField, op: '==', value: id },
    ];
    return this.fs('eventLogs')
      .query(clauses)
      .then((r) => r.length);
  }
}
exports.LogsQuery = LogsQuery;
//# sourceMappingURL=query.js.map
