import { DataSourceManager } from "../manager";
import { makeNewComment } from "../../models/comment";
import { FieldValue } from "firebase-admin/firestore";
class CommentsCommands extends DataSourceManager {
  async createComment(authorAddress, input) {
    const dao = this.fs("comments");
    const ref = dao.ref.doc();
    const id = ref.id;
    const comment = makeNewComment(id, authorAddress, input);
    await ref.set({
      authorAddress,
      postId: input.postId,
      parentCommentId: input.parentComment ?? null,
      ...comment
    });
    return comment;
  }
  async updateComment(input) {
    await this.fs("comments").update(input.commentId, {
      content: input.content,
      updatedAt: Date.now()
    });
    const raw = await this.fs("comments").get(input.commentId);
    return raw;
  }
  async deleteComment(commentId) {
    await this.fs("comments").delete(commentId);
  }
  async updateCounterField(id, field, delta) {
    const dao = this.fs("comments").ref;
    await dao.doc(id).update({ [field]: FieldValue.increment(delta) });
  }
}
export {
  CommentsCommands
};
//# sourceMappingURL=commands.js.map