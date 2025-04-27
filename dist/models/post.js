function defaultPostData() {
  return {
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    viewCount: 0
  };
}
function makeNewPost(id, authorAddress, input) {
  const now = Date.now();
  return {
    id,
    author: { address: authorAddress },
    title: input.title,
    description: input.description,
    cid: input.cid,
    media: input.media?.map((m) => ({
      id: m.cid,
      cid: m.cid,
      title: m.title,
      url: m.url,
      type: m.type
    })) ?? [],
    visibility: input.visibility,
    ...defaultPostData(),
    createdAt: now,
    updatedAt: now
  };
}
export {
  defaultPostData,
  makeNewPost
};
//# sourceMappingURL=post.js.map