import {
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import { type Ctx, enhanceTrigger } from "../manager";

export const postCreated = onDocumentCreated(
  "posts/{postId}",
  enhanceTrigger(
    async ({ ds, activity }: Pick<Ctx, "ds" | "activity">, event) => {
      const post = await ds.Posts.getPost(event.params.postId);
      const authorizedUser = post?.author.address;

      if (!authorizedUser) {
        console.warn(`postCreated without author on ${event.params.postId}`);
        return;
      }

      await Promise.resolve([
        ds.Users.updateCounterField(authorizedUser, "publicationsCount", +1),
        activity.postCreated(authorizedUser, event.params.postId),
      ]);

      console.log(`postCreated for ${event.params.postId}`);
    },
  ),
);

export const postHidden = onDocumentUpdated(
  "posts/{postId}",
  enhanceTrigger(
    async ({ ds, activity }: Pick<Ctx, "ds" | "activity">, event) => {
      const before = event?.data?.before.data();
      const after = event?.data?.after.data();
      const auth = after?.author?.address;

      if (!before?.hidden && after?.hidden) {
        if (!auth) {
          console.warn(`postHidden without author on ${event.params.postId}`);
          return;
        }

        await Promise.resolve([
          ds.Users.updateCounterField(auth, "publicationsCount", -1),
          activity.postHidden(auth, event.params.postId),
        ]);

        console.log(`postHidden for ${event.params.postId}`);
      }

      await activity.postUpdated(auth, event.params.postId);
    },
  ),
);
