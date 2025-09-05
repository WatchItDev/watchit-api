'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommentsCommands = void 0;
const manager_1 = require('../manager');
const comment_1 = require('../../models/comment');
const firestore_1 = require('firebase-admin/firestore');
class CommentsCommands extends manager_1.DataSourceManager {
  async createComment(address, input) {
    const dao = this.fs('comments');
    const ref = dao.ref.doc();
    const id = ref.id;
    const comment = (0, comment_1.makeNewComment)(id, address, input);
    await ref.set({
      address,
      postId: input.postId,
      parentCommentId: input.parentComment ?? null,
      ...comment,
    });
    return comment;
  }
  async updateComment(input) {
    await this.fs('comments').update(input.commentId, {
      content: input.content,
      updatedAt: Date.now(),
    });
    const raw = await this.fs('comments').get(input.commentId);
    return raw;
  }
  async hideComment(commentId) {
    const dao = this.fs('comments');
    await dao.ref.doc(commentId).update({
      hidden: true,
      updatedAt: Date.now(),
    });
  }
  async updateCounterField(id, field, delta) {
    const dao = this.fs('comments').ref;
    await dao
      .doc(id)
      .update({ [field]: firestore_1.FieldValue.increment(delta) });
  }
}
exports.CommentsCommands = CommentsCommands;
//# sourceMappingURL=commands.js.map
