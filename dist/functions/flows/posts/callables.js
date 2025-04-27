import { onCall } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v1/https";
import { enhanceFunction } from "../../manager";
const postsCreate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const post = await ds.Posts.createPost(input.authorAddress, input);
    console.log(`\u{1F195} post created ${post.id}`);
    return { post };
  })
);
const postsUpdate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const existing = await ds.Posts.getPost(input.postId);
    if (!existing) {
      throw new HttpsError("not-found", "post not found");
    }
    const post = await ds.Posts.updatePost(input.postId, input);
    console.log(`\u270F\uFE0F post updated ${input.postId}`);
    return { post };
  })
);
const postsDelete = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const { postId } = req.data;
    if (!postId) {
      throw new HttpsError("invalid-argument", "postId required");
    }
    await ds.Posts.deletePost(postId);
    console.log(`\u274C post deleted ${postId}`);
    return { success: true };
  })
);
const postsIncrementView = onCall(
  { region: "auto" },
  enhanceFunction(
    async ({ ds }, req) => {
      const { postId } = req.data;
      await ds.Posts.updateCounterField(postId, "viewCount", 1);
      const post = await ds.Posts.getPost(postId);
      console.log(`\u{1F440} viewCount ++ for post ${postId}`);
      return { post };
    }
  )
);
export {
  postsCreate,
  postsDelete,
  postsIncrementView,
  postsUpdate
};
//# sourceMappingURL=callables.js.map