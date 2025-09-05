import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

async function handleCommentCreated(
  { ds, activity }: Pick<Ctx, 'ds' | 'activity'>,
  event: any,
) {
  const commentId = event.params.commentId;
  const comment = await ds.Comments.getComment(commentId);
  if (!comment) return;

  const parentCommentId = comment.parentComment?.id;
  const postId = comment.post?.id;

  if (parentCommentId) {
    await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', 1);
    console.log(`replyCreated ${commentId} → parent ${parentCommentId}`);
    return;
  }

  if (!postId) {
    console.warn(`commentCreated without postId on ${commentId}`);
    return;
  }

  await ds.Posts.updateCounterField(postId, 'commentCount', 1);
  await activity.commentCreated(comment.author.address, commentId);
  console.log(`commentCreated ${commentId} → post ${postId}`);
}

async function handleCommentHidden(
  { ds, activity }: Pick<Ctx, 'ds' | 'activity'>,
  event: any,
) {
  const change = event.data;
  if (!change?.before || !change?.after) {
    console.warn(
      `commentHidden: without change data for ${event.params.commentId}`,
    );
    return;
  }

  const before = change.before.data();
  const after = change.after.data();
  const auth = after.author?.address;
  const commentId = event.params.commentId;
  const parentCommentId = after.parentCommentId;
  const postId = after.postId;

  if (!before.hidden && after.hidden) {
    if (parentCommentId) {
      await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', -1);
      await activity.commentHidden(auth, commentId);
      console.log(`replyHidden ${commentId} → parent ${parentCommentId}`);
    } else if (postId) {
      await ds.Posts.updateCounterField(postId, 'commentCount', -1);
      await activity.commentHidden(auth, commentId);
      console.log(`commentHidden ${commentId} → post ${postId}`);
    } else {
      console.warn(
        `commentHidden without parentCommentId and postId on ${commentId}`,
      );
    }
  }

  await activity.commentUpdated(auth ?? '', commentId);
}

export const commentCreated = onDocumentCreated(
  'comments/{commentId}',
  enhanceFunction(handleCommentCreated),
);

export const commentHidden = onDocumentUpdated(
  'comments/{commentId}',
  enhanceFunction(handleCommentHidden),
);
