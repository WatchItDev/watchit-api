const getCommentsByPost = async (_parent, { postId, limit }, { services }) => {
  return services.Comments.getCommentsByPost(postId, limit);
};
export {
  getCommentsByPost
};
//# sourceMappingURL=getCommentsByPost.js.map