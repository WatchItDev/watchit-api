'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LikesService = void 0;
const manager_1 = require('./manager');
const toggle_1 = require('../helpers/toggle');
class LikesService extends manager_1.ServiceManager {
  toggleLike = (address, targetId, targetType) =>
    (0, toggle_1.toggle)(
      () => this.ds.Likes.isLiked(address, targetId),
      () => this.ds.Likes.addLike(address, targetId, targetType),
      () => this.ds.Likes.removeLike(address, targetId),
    );
  isLiked = (address, targetId) => this.ds.Likes.isLiked(address, targetId);
}
exports.LikesService = LikesService;
//# sourceMappingURL=likes.js.map
