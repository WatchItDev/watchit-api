const User = {
  followersCount: (parent) => parent.followersCount ?? 0,
  followingCount: (parent) => parent.followingCount ?? 0,
  publicationsCount: (parent) => parent.publicationsCount ?? 0,
  bookmarksCount: (parent) => parent.bookmarksCount ?? 0
};
export {
  User
};
//# sourceMappingURL=User.js.map