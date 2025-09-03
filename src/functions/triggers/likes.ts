import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import { type Ctx, enhanceTrigger } from "../manager";

interface LikeDoc {
  author: string;
  targetId: string;
  targetType: "POST" | "COMMENT";
  owner?: string;
}

export const likeInc = onDocumentCreated(
  "likes/{likeId}",
  enhanceTrigger(
    async ({ ds, activity }: Pick<Ctx, "ds" | "activity">, event) => {
      const snap = event.data;
      if (!snap) return;

      const { targetId, targetType, author, owner } = snap.data() as LikeDoc;
      if (!targetId || !targetType) return;

      if (targetType === "POST") {
        await ds.Posts.updateCounterField(targetId, "likeCount", +1);
        console.log(`👍  Post ${targetId} liked`);
      }
      if (targetType === "COMMENT") {
        await ds.Comments.updateCounterField(targetId, "likeCount", +1);
        console.log(`👍  Comment ${targetId} liked`);
      }
      await activity.likeCreated(author, targetId, targetType, { owner });
    },
  ),
);

export const likeDec = onDocumentDeleted(
  "likes/{likeId}",
  enhanceTrigger(
    async ({ ds, activity }: Pick<Ctx, "ds" | "activity">, event) => {
      const snap = event.data;
      if (!snap) return;

      const { targetId, targetType, author } = snap.data() as LikeDoc;
      if (!targetId || !targetType) return;

      if (targetType === "POST") {
        await ds.Posts.updateCounterField(targetId, "likeCount", -1);
        console.log(`👎  Post ${targetId} unliked`);
      }
      if (targetType === "COMMENT") {
        await ds.Comments.updateCounterField(targetId, "likeCount", -1);
        console.log(`👎  Comment ${targetId} unliked`);
      }
      await activity.likeRemoved(author, targetId, targetType);
    },
  ),
);
