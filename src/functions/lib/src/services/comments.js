'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommentService = void 0;
const manager_1 = require('./manager');
class CommentService extends manager_1.ServiceManager {
  /** Create a comment via Cloud Function */
  async createComment(input, address) {
    return this.ds.Comments.createComment(address, input);
  }
  /** Update a comment via Cloud Function */
  async updateComment(input) {
    return this.ds.Comments.updateComment(input);
  }
  /** Hide a comment via Cloud Function */
  async hideComment(commentId) {
    return this.ds.Comments.hideComment(commentId);
  }
  /** Read-only fetches */
  getComment(id) {
    return this.ds.Comments.getComment(id);
  }
  getCommentsByPost(postId, limit) {
    return this.ds.Comments.getCommentsByPost(postId, limit);
  }
  getRepliesByComment(commentId, limit) {
    return this.ds.Comments.getRepliesByComment(commentId, limit);
  }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comments.js.map
