'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.XPQuery = void 0;
const manager_1 = require('../manager');
class XPQuery extends manager_1.DataSourceManager {
  async getHistory(address, limit = 50, offset = 0) {
    const rows = await this.fs('xpEntries').query(
      [{ field: 'user', op: '==', value: address }],
      {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      },
    );
    return rows.slice(offset);
  }
}
exports.XPQuery = XPQuery;
//# sourceMappingURL=query.js.map
