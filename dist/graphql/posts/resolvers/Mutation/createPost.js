const createPost = async (_parent, { input }, { services }) => {
  return services.Posts.createPost(input);
};
export {
  createPost
};
//# sourceMappingURL=createPost.js.map