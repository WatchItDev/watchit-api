function defaultUserData() {
  return {
    followersCount: 0,
    followingCount: 0,
    publicationsCount: 0,
    bookmarksCount: 0,
    verified: false
  };
}
function makeNewUser(input) {
  const now = Date.now();
  return {
    ...defaultUserData(),
    ...input,
    profilePicture: input.profilePicture ?? "",
    coverPicture: input.coverPicture ?? "",
    socialLinks: input.socialLinks ?? [],
    createdAt: now,
    updatedAt: now
  };
}
export {
  defaultUserData,
  makeNewUser
};
//# sourceMappingURL=user.js.map