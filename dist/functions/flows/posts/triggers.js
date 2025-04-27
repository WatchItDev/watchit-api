import { onDocumentCreated, onDocumentDeleted } from "firebase-functions/v2/firestore";
import { enhanceTrigger } from "../../manager";
const postCreated = onDocumentCreated(
  "posts/{postId}",
  enhanceTrigger(async ({ ds }, event) => {
    const p = await ds.Posts.getPost(event.params.postId);
    const auth = p?.author.address;
    if (!auth) {
      console.warn(`postCreated without author on ${event.params.postId}`);
      return;
    }
    await ds.Users.updateCounterField(auth, "publicationsCount", 1);
    console.log(`\u{1F525} postCreated for ${event.params.postId}`);
  })
);
const postDeleted = onDocumentDeleted(
  "posts/{postId}",
  enhanceTrigger(async ({ ds }, event) => {
    const old = event.data?.data();
    const auth = old?.author?.address;
    if (!auth) {
      console.warn(`postDeleted without author on ${event.params.postId}`);
      return;
    }
    await ds.Users.updateCounterField(auth, "publicationsCount", -1);
    console.log(`\u{1F525} postDeleted for ${event.params.postId}`);
  })
);
export {
  postCreated,
  postDeleted
};
//# sourceMappingURL=triggers.js.map