import { ServiceManager } from "./manager";
class CommentService extends ServiceManager {
  /** Create a comment via Cloud Function */
  async createComment(input) {
    const res = await this.ext.Functions().comments.create(input);
    return res.data.comment;
  }
  /** Update a comment via Cloud Function */
  async updateComment(input) {
    const res = await this.ext.Functions().comments.update(input);
    return res.data.comment;
  }
  /** Delete a comment via Cloud Function */
  async deleteComment(commentId) {
    const res = await this.ext.Functions().comments.delete({ commentId });
    return res.data.success;
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
export {
  CommentService
};
//# sourceMappingURL=comments.js.map