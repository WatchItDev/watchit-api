import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { type Ctx, enhanceTrigger } from '../../manager'

export const bookmarkInc = onDocumentCreated(
    'bookmarks/{bmId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx,'ds' | 'activity'>, event) => {
            const snap = event.data;
            if (!snap) return;
            const { author, postId } = snap.data() as { author?: string; postId?: string; };

            if (!author || !postId) return;

            await Promise.all([
                ds.Posts.updateCounterField(postId, 'bookmarkCount', +1),
                ds.Users.updateCounterField(author, 'bookmarksCount', +1),
                activity.bookmarkCreated(author, postId)
            ]);

            console.log(`🔖  Post ${postId} bookmarked by ${author}`);
    })
);

export const bookmarkDec = onDocumentDeleted(
    'bookmarks/{bmId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx,'ds' | 'activity'>, event) => {
            const snap = event.data;
            if (!snap) return;
            const { author, postId } = snap.data() as { author?: string; postId?: string; };

            if (!author || !postId) return;

            await Promise.all([
                ds.Posts.updateCounterField(postId, 'bookmarkCount', -1),
                ds.Users.updateCounterField(author, 'bookmarksCount', -1),
                activity.bookmarkRemoved(author, postId)
            ]);

            console.log(`❌  Bookmark removed on post ${postId} by ${author}`);
    })
);
