'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultUserData = defaultUserData;
exports.makeNewUser = makeNewUser;
function defaultUserData() {
  return {
    followersCount: 0,
    followingCount: 0,
    publicationsCount: 0,
    bookmarksCount: 0,
    xpBalance: 0,
    xpTotal: 0,
    currentRank: '',
    verified: false,
  };
}
function makeNewUser(input) {
  const now = Date.now();
  return {
    ...defaultUserData(),
    ...input,
    id: input.id ?? '',
    email: input.email ?? '',
    profilePicture: input.profilePicture ?? '',
    coverPicture: input.coverPicture ?? '',
    socialLinks: input.socialLinks ?? [],
    createdAt: now,
    updatedAt: now,
  };
}
//# sourceMappingURL=user.js.map
