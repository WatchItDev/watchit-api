'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultPostData = defaultPostData;
exports.makeNewPost = makeNewPost;
function defaultPostData() {
  return {
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    viewCount: 0,
    hidden: false,
  };
}
function makeNewPost(id, address, input) {
  const now = Date.now();
  return {
    id,
    author: { address: address },
    title: input.title,
    description: input.description,
    cid: input.cid,
    year: 0,
    media:
      input.media?.map((m) => ({
        id: m.cid,
        cid: m.cid,
        title: m.title,
        url: m.url,
        type: m.type,
      })) ?? [],
    visibility: input.visibility,
    ...defaultPostData(),
    createdAt: now,
    updatedAt: now,
  };
}
//# sourceMappingURL=post.js.map
