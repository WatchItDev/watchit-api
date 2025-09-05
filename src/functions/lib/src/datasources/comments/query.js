'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommentsQuery = void 0;
const manager_1 = require('../manager');
class CommentsQuery extends manager_1.DataSourceManager {
  async getComment(id) {
    const c = await this.fs('comments').get(id);
    return c && !c.hidden ? c : null;
  }
  async getCommentsByPost(postId, limit = 20) {
    return this.fs('comments').query(
      [
        { field: 'postId', op: '==', value: postId },
        { field: 'parentCommentId', op: '==', value: null },
        { field: 'hidden', op: '==', value: false },
      ],
      {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      },
    );
  }
  async getRepliesByComment(commentId, limit = 20) {
    return this.fs('comments').query(
      [
        { field: 'parentCommentId', op: '==', value: commentId },
        { field: 'hidden', op: '==', value: false },
      ],
      {
        limit,
        orderBy: { field: 'createdAt', direction: 'desc' },
      },
    );
  }
}
exports.CommentsQuery = CommentsQuery;
//# sourceMappingURL=query.js.map
