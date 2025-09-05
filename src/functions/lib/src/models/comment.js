'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultCommentData = defaultCommentData;
exports.makeNewComment = makeNewComment;
function defaultCommentData() {
  return {
    likeCount: 0,
    repliesCount: 0,
    hidden: false,
  };
}
function makeNewComment(id, address, input) {
  const now = Date.now();
  return {
    id,
    author: { address: address },
    post: { id: input.postId },
    parentComment: input.parentComment ? { id: input.parentComment } : null,
    content: input.content,
    createdAt: now,
    updatedAt: now,
    ...defaultCommentData(),
  };
}
//# sourceMappingURL=comment.js.map
