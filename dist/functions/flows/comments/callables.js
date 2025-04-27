import "reflect-metadata";
import { onCall } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v1/https";
import { enhanceFunction } from "../../manager";
const commentsCreate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const comment = await ds.Comments.createComment(input.authorAddress, input);
    console.log(`\u{1F195} comment created ${comment.id}`);
    return { comment };
  })
);
const commentsUpdate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const existing = await ds.Comments.getComment(input.commentId);
    if (!existing) {
      throw new HttpsError("not-found", "comment not found");
    }
    const comment = await ds.Comments.updateComment(input);
    console.log(`\u270F\uFE0F  comment updated ${input.commentId}`);
    return { comment };
  })
);
const commentsDelete = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const { commentId } = req.data;
    await ds.Comments.deleteComment(commentId);
    console.log(`\u274C comment deleted ${commentId}`);
    return { success: true };
  })
);
export {
  commentsCreate,
  commentsDelete,
  commentsUpdate
};
//# sourceMappingURL=callables.js.map