'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RanksService = void 0;
const manager_1 = require('./manager');
const rank_1 = require('../models/rank');
class RanksService extends manager_1.ServiceManager {
  catalog = () => this.ds.Ranks.catalog();
  getRank = (id) => this.ds.Ranks.getRank(id);
  evaluate = (xpTotal) => this.ds.Ranks.evaluate(xpTotal);
  userRanks = (addr) => this.ds.Ranks.userRanks(addr);
  async achievements(address) {
    const user = await this.ds.Users.getUser(address);
    if (!user) return null;
    const { current, next } = await this.ds.Ranks.evaluate(user.xpTotal);
    const remaining = next ? next.minXp - user.xpTotal : 0;
    const pct = next
      ? ((user.xpTotal - current.minXp) / (next.minXp - current.minXp)) * 100
      : 100;
    return {
      currentRank: current,
      nextRank: next,
      xpBalance: user.xpBalance,
      xpTotal: user.xpTotal,
      progressPct: pct,
      xpRemaining: remaining,
    };
  }
  createRank = (input) => this.ds.Ranks.createRank((0, rank_1.makeRank)(input));
  updateRank = (id, p) => this.ds.Ranks.updateRank(id, p);
  deleteRank = (id) => this.ds.Ranks.deleteRank(id);
}
exports.RanksService = RanksService;
//# sourceMappingURL=ranks.js.map
