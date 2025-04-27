import { DataSourceManager } from "../manager";
class CommentsQuery extends DataSourceManager {
  getComment(id) {
    return this.fs("comments").get(id);
  }
  getCommentsByPost(postId, limit = 20) {
    return this.fs("comments").query([{ field: "postId", op: "==", value: postId }], limit);
  }
  getRepliesByComment(commentId, limit = 20) {
    return this.fs("comments").query(
      [{ field: "parentCommentId", op: "==", value: commentId }],
      limit
    );
  }
}
export {
  CommentsQuery
};
//# sourceMappingURL=query.js.map