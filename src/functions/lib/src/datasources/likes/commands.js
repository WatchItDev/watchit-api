'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LikesCommands = void 0;
const manager_1 = require('../manager');
class LikesCommands extends manager_1.DataSourceManager {
  addLike(addr, targetId, targetType) {
    return this.fs('likes').create(`${addr}_${targetId}`, {
      targetId,
      targetType,
      author: addr,
      createdAt: Date.now(),
    });
  }
  removeLike(addr, targetId) {
    return this.fs('likes').delete(`${addr}_${targetId}`);
  }
}
exports.LikesCommands = LikesCommands;
//# sourceMappingURL=commands.js.map
