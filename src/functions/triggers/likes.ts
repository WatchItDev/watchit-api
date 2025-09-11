import { log, warn } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

interface LikeDoc {
  author: string;
  targetId: string;
  targetType: 'POST' | 'COMMENT';
  owner?: string;
}

export const likeInc = onDocumentCreated(
  'likes/{likeId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { targetId, targetType, author, owner } = snap.data() as LikeDoc;
    if (!targetId || !targetType) return;

    if (targetType === 'POST') {
      await ds.Posts.updateCounterField(targetId, 'likeCount', +1);
      log('[LIKE_CREATED] Post liked', { targetId });
    }

    if (targetType === 'COMMENT') {
      await ds.Comments.updateCounterField(targetId, 'likeCount', +1);
      log('[LIKE_CREATED] Comment liked', { targetId });
    }
    await activity.likeCreated(author, targetId, targetType, { owner });
  }),
);

export const likeDec = onDocumentDeleted(
  'likes/{likeId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { targetId, targetType, author } = snap.data() as LikeDoc;
    if (!targetId || !targetType) return;

    if (targetType === 'POST') {
      await ds.Posts.updateCounterField(targetId, 'likeCount', -1);
      warn('[LIKE_REMOVED] Post unliked', { targetId });
    }
    if (targetType === 'COMMENT') {
      await ds.Comments.updateCounterField(targetId, 'likeCount', -1);
      warn('[LIKE_REMOVED] Comment unliked', { targetId });
    }
    await activity.likeRemoved(author, targetId, targetType);
  }),
);
