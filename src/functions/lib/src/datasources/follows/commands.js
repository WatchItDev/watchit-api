'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FollowsCommands = void 0;
const manager_1 = require('../manager');
class FollowsCommands extends manager_1.DataSourceManager {
  addFollow(follower, following) {
    return this.fs('follows').create(`${follower}_${following}`, {
      follower,
      following,
      createdAt: Date.now(),
    });
  }
  removeFollow(follower, following) {
    return this.fs('follows').delete(`${follower}_${following}`);
  }
}
exports.FollowsCommands = FollowsCommands;
//# sourceMappingURL=commands.js.map
