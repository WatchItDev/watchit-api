import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

export const postCreated = onDocumentCreated(
  'posts/{postId}',
  enhanceFunction(
    async (
      { ds, activity, ext }: Pick<Ctx, 'ds' | 'activity' | 'ext'>,
      event,
    ) => {
      const post = await ds.Posts.getPost(event.params.postId);
      const authorizedUser = post?.author.address;

      if (!authorizedUser) {
        console.warn(`postCreated without author on ${event.params.postId}`);
        return;
      }

      await Promise.resolve([
        ds.Users.updateCounterField(authorizedUser, 'publicationsCount', +1),
        activity.postCreated(authorizedUser, event.params.postId),
      ]);

      console.log(`postCreated for ${event.params.postId}`);
    },
  ),
);

export const postHidden = onDocumentUpdated(
  'posts/{postId}',
  enhanceFunction(
    async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
      const wasHidden = event?.data?.before.data();
      const currentlyHidden = event?.data?.after.data();
      const authorized = currentlyHidden?.author?.address;

      if ((wasHidden?.hidden && !currentlyHidden?.hidden) || !authorized)
        return;

      await Promise.resolve([
        ds.Users.updateCounterField(authorized, 'publicationsCount', -1),
        activity.postHidden(authorized, event.params.postId),
      ]);

      console.log(`postHidden for ${event.params.postId}`);
    },
  ),
);
