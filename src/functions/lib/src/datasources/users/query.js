'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UsersQuery = void 0;
const manager_1 = require('../manager');
class UsersQuery extends manager_1.DataSourceManager {
  getUser = async (addr) => this.fs('users').get(addr);
  getUsers = async (q, limit = 50) => {
    if (!q) return [];
    return this.fs('users').search(q, limit, false);
  };
  async getUserById(id) {
    const [u] = await this.fs('users').query(
      [{ field: 'id', op: '==', value: id.toLowerCase() }],
      { limit: 1 },
    );
    return u ?? null;
  }
  async topByXp(limit = 100) {
    return this.fs('users').query([], {
      orderBy: { field: 'xpTotal', direction: 'desc' },
      limit,
    });
  }
}
exports.UsersQuery = UsersQuery;
//# sourceMappingURL=query.js.map
