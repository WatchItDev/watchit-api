'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PerksQuery = void 0;
const manager_1 = require('../manager');
class PerksQuery extends manager_1.DataSourceManager {
  getCatalog = () => this.fs('perks').list(500);
  statesByUser = (u, l = 50, o = 0) =>
    this.fs('userPerkState')
      .query([{ field: 'user', op: '==', value: u }], {
        orderBy: { field: 'createdAt', direction: 'desc' },
        limit: l,
      })
      .then((r) => r.slice(o));
  getState = (u, p) => this.fs('userPerkState').get(`${u}-${p}`);
  hasPerk = async (u, p) => !!(await this.getState(u, p));
}
exports.PerksQuery = PerksQuery;
//# sourceMappingURL=query.js.map
