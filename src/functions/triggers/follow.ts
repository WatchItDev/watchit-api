import { log } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

type FollowData = { follower?: string; following?: string };

export const followInc = onDocumentCreated(
  'follows/{relId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { follower, following } = snap.data() as FollowData;
    if (!follower || !following) return;

    await Promise.all([
      ds.Users.updateCounterField(following, 'followersCount', +1),
      ds.Users.updateCounterField(follower, 'followingCount', +1),
      activity.followCreated(follower, following),
    ]);

    log(`[FOLLOW_INC] Follower: ${follower} started following: ${following}`);
  }),
);

export const followDec = onDocumentDeleted(
  'follows/{relId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { follower, following } = snap.data() as FollowData;
    if (!follower || !following) return;

    await Promise.all([
      ds.Users.updateCounterField(following, 'followersCount', -1),
      ds.Users.updateCounterField(follower, 'followingCount', -1),
      activity.followRemoved(follower, following),
    ]);

    log(`[FOLLOW_DEC] Follower: ${follower} stopped following: ${following}`);
  }),
);
