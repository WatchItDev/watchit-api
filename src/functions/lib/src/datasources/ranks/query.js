'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RanksQuery = void 0;
const manager_1 = require('../manager');
class RanksQuery extends manager_1.DataSourceManager {
  getRank = (id) => this.fs('ranks').get(id);
  async catalog() {
    return this.fs('ranks').list(100);
  }
  async evaluate(totalXp) {
    const ranks = await this.catalog();
    ranks.sort((a, b) => a.minXp - b.minXp);
    const current = ranks.filter((r) => r.minXp <= totalXp).pop();
    const next = ranks.find((r) => r.minXp > current.minXp) ?? null;
    return { current, next };
  }
  userRanks = (user) =>
    this.fs('userRanks').query([{ field: 'user', op: '==', value: user }], {
      orderBy: { field: 'achievedAt', direction: 'asc' },
      limit: 100,
    });
}
exports.RanksQuery = RanksQuery;
//# sourceMappingURL=query.js.map
