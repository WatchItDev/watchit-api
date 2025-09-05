'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.commentHidden = exports.commentCreated = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
async function handleCommentCreated({ ds, activity }, event) {
  const commentId = event.params.commentId;
  const comment = await ds.Comments.getComment(commentId);
  if (!comment) return;
  const parentCommentId = comment.parentComment?.id;
  const postId = comment.post?.id;
  if (parentCommentId) {
    await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', 1);
    console.log(`replyCreated ${commentId} → parent ${parentCommentId}`);
    return;
  }
  if (!postId) {
    console.warn(`commentCreated without postId on ${commentId}`);
    return;
  }
  await ds.Posts.updateCounterField(postId, 'commentCount', 1);
  await activity.commentCreated(comment.author.address, commentId);
  console.log(`commentCreated ${commentId} → post ${postId}`);
}
async function handleCommentHidden({ ds, activity }, event) {
  const change = event.data;
  if (!change?.before || !change?.after) {
    console.warn(
      `commentHidden: without change data for ${event.params.commentId}`,
    );
    return;
  }
  const before = change.before.data();
  const after = change.after.data();
  const auth = after.author?.address;
  const commentId = event.params.commentId;
  const parentCommentId = after.parentCommentId;
  const postId = after.postId;
  if (!before.hidden && after.hidden) {
    if (parentCommentId) {
      await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', -1);
      await activity.commentHidden(auth, commentId);
      console.log(`replyHidden ${commentId} → parent ${parentCommentId}`);
    } else if (postId) {
      await ds.Posts.updateCounterField(postId, 'commentCount', -1);
      await activity.commentHidden(auth, commentId);
      console.log(`commentHidden ${commentId} → post ${postId}`);
    } else {
      console.warn(
        `commentHidden without parentCommentId and postId on ${commentId}`,
      );
    }
  }
  await activity.commentUpdated(auth ?? '', commentId);
}
exports.commentCreated = (0, firestore_1.onDocumentCreated)(
  'comments/{commentId}',
  (0, manager_1.enhanceFunction)(handleCommentCreated),
);
exports.commentHidden = (0, firestore_1.onDocumentUpdated)(
  'comments/{commentId}',
  (0, manager_1.enhanceFunction)(handleCommentHidden),
);
//# sourceMappingURL=comments.js.map
