'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FollowService = void 0;
const manager_1 = require('./manager');
const toggle_1 = require('../helpers/toggle');
class FollowService extends manager_1.ServiceManager {
  toggleFollow = (me, target) =>
    (0, toggle_1.toggle)(
      () => this.ds.Follows.isFollowing(me, target),
      () => this.ds.Follows.addFollow(me, target),
      () => this.ds.Follows.removeFollow(me, target),
    );
  isFollowing = (follower, following) =>
    this.ds.Follows.isFollowing(follower, following);
  getFollowers = (addr, limit = 50) => this.ds.Follows.followersOf(addr, limit);
  getFollowing = (addr, limit = 50) => this.ds.Follows.followingOf(addr, limit);
}
exports.FollowService = FollowService;
//# sourceMappingURL=follows.js.map
