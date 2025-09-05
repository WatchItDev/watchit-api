'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LeaderboardService = void 0;
const manager_1 = require('./manager');
class LeaderboardService extends manager_1.ServiceManager {
  async topByXp(limit = 100) {
    return this.ds.Users.topByXp(limit);
  }
}
exports.LeaderboardService = LeaderboardService;
//# sourceMappingURL=leaderboard.js.map
