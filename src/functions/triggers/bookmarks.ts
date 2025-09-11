import { log } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { type Ctx, enhanceFunction } from '../manager';

interface BmDoc {
  author: string;
  postId: string;
  owner?: string;
}

export const bookmarkIncrement = onDocumentCreated(
  'bookmarks/{bmId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { author, postId, owner } = snap.data() as BmDoc;
    if (!author || !postId) return;

    await Promise.all([
      ds.Posts.updateCounterField(postId, 'bookmarkCount', +1),
      ds.Users.updateCounterField(author, 'bookmarksCount', +1),
      activity.bookmarkCreated(author, postId, { owner }),
    ]);

    log(`[BOOKMARK_CREATED] Post '${postId}' bookmarked by user '${author}'`);
  }),
);

export const bookmarkDecrement = onDocumentDeleted(
  'bookmarks/{bmId}',
  enhanceFunction(async ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>, event) => {
    const snap = event.data;
    if (!snap) return;

    const { author, postId } = snap.data() as BmDoc;
    if (!author || !postId) return;

    await Promise.all([
      ds.Posts.updateCounterField(postId, 'bookmarkCount', -1),
      ds.Users.updateCounterField(author, 'bookmarksCount', -1),
      activity.bookmarkRemoved(author, postId),
    ]);

    log(`[BOOKMARK_REMOVED] Bookmark removed from post '${postId}' by user '${author}'`);
  }),
);
