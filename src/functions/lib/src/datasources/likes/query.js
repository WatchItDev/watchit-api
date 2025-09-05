'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LikesQuery = void 0;
const manager_1 = require('../manager');
class LikesQuery extends manager_1.DataSourceManager {
  isLiked(addr, targetId) {
    return this.fs('likes').exists(`${addr}_${targetId}`);
  }
}
exports.LikesQuery = LikesQuery;
//# sourceMappingURL=query.js.map
