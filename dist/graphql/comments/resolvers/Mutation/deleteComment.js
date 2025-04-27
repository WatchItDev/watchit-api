const deleteComment = async (_parent, { commentId }, { services }) => {
  await services.Comments.deleteComment(commentId);
  return true;
};
export {
  deleteComment
};
//# sourceMappingURL=deleteComment.js.map