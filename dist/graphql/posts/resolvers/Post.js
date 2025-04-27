const Post = {
  author: (p, _a, { services }) => services.Profile.getProfile(p.author.address)
};
export {
  Post
};
//# sourceMappingURL=Post.js.map