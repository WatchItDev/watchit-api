const updateComment = async (_parent, { input }, { services }) => {
  return services.Comments.updateComment(input);
};
export {
  updateComment
};
//# sourceMappingURL=updateComment.js.map