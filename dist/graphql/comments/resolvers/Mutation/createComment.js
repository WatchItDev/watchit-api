const createComment = async (_parent, { input }, { services }) => {
  return services.Comments.createComment(input);
};
export {
  createComment
};
//# sourceMappingURL=createComment.js.map