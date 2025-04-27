const getRepliesByComment = async (_parent, { commentId, limit }, { services }) => {
  return services.Comments.getRepliesByComment(commentId, limit);
};
export {
  getRepliesByComment
};
//# sourceMappingURL=getRepliesByComment.js.map