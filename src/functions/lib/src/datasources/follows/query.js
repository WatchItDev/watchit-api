'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FollowsQuery = void 0;
const manager_1 = require('../manager');
class FollowsQuery extends manager_1.DataSourceManager {
  isFollowing(follower, following) {
    return this.fs('follows').exists(`${follower}_${following}`);
  }
  async followersOf(address, limit = 50) {
    const rows = await this.fs('follows').query(
      [{ field: 'following', op: '==', value: address }],
      { limit },
    );
    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs('users').get(r.follower)),
    );
    return users.filter(Boolean);
  }
  async followingOf(address, limit = 50) {
    const rows = await this.fs('follows').query(
      [{ field: 'follower', op: '==', value: address }],
      { limit },
    );
    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs('users').get(r.following)),
    );
    return users.filter(Boolean);
  }
}
exports.FollowsQuery = FollowsQuery;
//# sourceMappingURL=query.js.map
