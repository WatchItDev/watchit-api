import { log, warn } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

export const postCreated = onDocumentCreated(
  'posts/{postId}',
  enhanceFunction(async ({ ds, activity, ext }: Pick<Ctx, 'ds' | 'activity' | 'ext'>, event) => {
    const post = await ds.Posts.getPost(event.params.postId);
    const authorizedUser = post?.author.address;

    if (!authorizedUser) {
      warn(`[POST_CREATED] No author found for postId: ${event.params.postId}`);
      return;
    }

    await Promise.resolve([
      ds.Users.updateCounterField(authorizedUser, 'publicationsCount', +1),
      activity.postCreated(authorizedUser, event.params.postId),
    ]);

    log(`[POST_CREATED] Publication created for postId: ${event.params.postId}`);
  }),
);

export const postHidden = onDocumentUpdated(
  'posts/{postId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const wasHidden = event?.data?.before.data();
    const currentlyHidden = event?.data?.after.data();
    const authorized = currentlyHidden?.author?.address;

    if ((wasHidden?.hidden && !currentlyHidden?.hidden) || !authorized) return;

    await Promise.resolve([
      ds.Users.updateCounterField(authorized, 'publicationsCount', -1),
      activity.postHidden(authorized, event.params.postId),
    ]);

    log(`[POST_HIDDEN] Publication hidden for postId: ${event.params.postId}`);
  }),
);
