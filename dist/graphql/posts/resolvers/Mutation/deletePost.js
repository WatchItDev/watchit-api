const deletePost = async (_parent, { postId }, { services }) => {
  await services.Posts.deletePost(postId);
  return true;
};
export {
  deletePost
};
//# sourceMappingURL=deletePost.js.map