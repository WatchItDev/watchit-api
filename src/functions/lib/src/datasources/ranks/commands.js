'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RanksCommands = void 0;
const manager_1 = require('../manager');
const rank_1 = require('../../models/rank');
const userRank_1 = require('../../models/userRank');
class RanksCommands extends manager_1.DataSourceManager {
  createRank = (i) =>
    this.fs('ranks')
      .create(i.id, (0, rank_1.makeRank)(i))
      .then(() => this.fs('ranks').get(i.id));
  updateRank = (id, p) =>
    this.fs('ranks')
      .update(id, { ...p, updatedAt: Date.now() })
      .then(() => this.fs('ranks').get(id));
  deleteRank = (id) =>
    this.fs('ranks')
      .delete(id)
      .then(() => true);
  addUserRank = (user, rankId) =>
    this.fs('userRanks').create(
      `${user}_${rankId}`,
      (0, userRank_1.makeUserRank)(user, rankId),
    );
}
exports.RanksCommands = RanksCommands;
//# sourceMappingURL=commands.js.map
