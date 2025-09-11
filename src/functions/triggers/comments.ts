import { log, warn } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

async function handleCommentCreated({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event: any) {
  const commentId = event.params.commentId;
  const comment = event.data?.after?.data();
  const parentCommentId = comment.parentComment?.id;
  const postId = comment.post?.id;

  if (parentCommentId) {
    await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', 1);
    log(`[COMMENT_CREATED] Reply ${commentId} created for parent ${parentCommentId}`);
    return;
  }

  if (!postId) {
    warn(`[COMMENT_CREATED] Comment ${commentId} created without postId`);
    return;
  }

  await ds.Posts.updateCounterField(postId, 'commentCount', 1);
  await activity.commentCreated(comment.author.address, commentId);
  log(`[COMMENT_CREATED] Comment ${commentId} created for post ${postId}`);
}

async function handleCommentHidden({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event: any) {
  const change = event.data;
  if (!change?.before || !change?.after) {
    warn(`[COMMENT_HIDDEN] Missing change data for comment ${event.params.commentId}`);
    return;
  }

  const before = change.before.data();
  const after = change.after.data();
  const auth = after.author?.address;
  const commentId = event.params.commentId;
  const parentCommentId = after.parentCommentId;
  const postId = after.postId;

  // if the comment is already hidden, do nothing
  if (before.hidden) return;
  if (parentCommentId) {
    await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', -1);
    await activity.commentHidden(auth, commentId);
    log(`[COMMENT_HIDDEN] Reply ${commentId} hidden for parent ${parentCommentId}`);
  } else if (postId) {
    await ds.Posts.updateCounterField(postId, 'commentCount', -1);
    await activity.commentHidden(auth, commentId);
    log(`[COMMENT_HIDDEN] Comment ${commentId} hidden for post ${postId}`);
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
