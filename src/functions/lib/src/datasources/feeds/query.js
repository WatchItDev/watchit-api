'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FeedsQuery = void 0;
const manager_1 = require('../manager');
class FeedsQuery extends manager_1.DataSourceManager {
  async popularUsers(limit = 20) {
    const all = await this.fs('users').list(limit);
    return all
      .sort((a, b) => b.followersCount - a.followersCount)
      .slice(0, limit);
  }
  async recentUsers(limit = 20) {
    return this.fs('users').query([], {
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit,
    });
  }
  async activeUsers(limit = 20) {
    const all = await this.fs('users').list(limit);
    return all
      .sort(
        (a, b) =>
          b.publicationsCount +
          b.followersCount -
          (a.publicationsCount + a.followersCount),
      )
      .slice(0, limit);
  }
  async popularPosts(limit = 20) {
    return this.fs('posts').query(
      [{ field: 'hidden', op: '==', value: false }],
      { orderBy: { field: 'likeCount', direction: 'desc' }, limit },
    );
  }
  async recentPosts(limit = 20) {
    return this.fs('posts').query(
      [{ field: 'hidden', op: '==', value: false }],
      { orderBy: { field: 'createdAt', direction: 'desc' }, limit },
    );
  }
  async allPosts(limit = 100) {
    return this.fs('posts').query(
      [{ field: 'hidden', op: '==', value: false }],
      { limit },
    );
  }
}
exports.FeedsQuery = FeedsQuery;
//# sourceMappingURL=query.js.map
