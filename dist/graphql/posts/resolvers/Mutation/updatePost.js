const updatePost = async (_parent, { input }, { services }) => {
  return services.Posts.updatePost(input);
};
export {
  updatePost
};
//# sourceMappingURL=updatePost.js.map