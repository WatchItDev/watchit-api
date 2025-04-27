const incrementPostView = async (_parent, { postId }, { services }) => {
  return services.Posts.incrementView(postId);
};
export {
  incrementPostView
};
//# sourceMappingURL=incrementPostView.js.map