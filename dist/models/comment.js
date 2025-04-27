function defaultCommentData() {
  return {
    likeCount: 0
  };
}
function makeNewComment(id, authorAddress, input) {
  const now = Date.now();
  return {
    id,
    author: { address: authorAddress },
    post: { id: input.postId },
    parentComment: input.parentComment ? { id: input.parentComment } : null,
    content: input.content,
    createdAt: now,
    updatedAt: now,
    ...defaultCommentData()
  };
}
export {
  defaultCommentData,
  makeNewComment
};
//# sourceMappingURL=comment.js.map