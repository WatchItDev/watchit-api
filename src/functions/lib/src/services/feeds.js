'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FeedsService = void 0;
const manager_1 = require('./manager');
class FeedsService extends manager_1.ServiceManager {
  popularUsers(limit) {
    return this.ds.Feeds.popularUsers(limit);
  }
  recentUsers(limit) {
    return this.ds.Feeds.recentUsers(limit);
  }
  activeUsers(limit) {
    return this.ds.Feeds.activeUsers(limit);
  }
  popularPosts(limit) {
    return this.ds.Feeds.popularPosts(limit);
  }
  recentPosts(limit) {
    return this.ds.Feeds.recentPosts(limit);
  }
  allPosts(limit) {
    return this.ds.Feeds.allPosts(limit);
  }
}
exports.FeedsService = FeedsService;
//# sourceMappingURL=feeds.js.map
