import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                   from '../../../services/manager'

export const bookmarkInc = onDocumentCreated(
    'bookmarks/{bmId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
            const snap = event.data;
            if (!snap) return;
            const { author, postId } = snap.data() as { author?: string; postId?: string; };

            if (!author || !postId) return;

            await Promise.all([
                    ds.Posts.updateCounterField(postId, 'bookmarkCount', +1),
                    ds.Users.updateCounterField(author, 'bookmarksCount', +1),
            ]);

            console.log(`🔖  Post ${postId} bookmarked by ${author}`);
    })
);

export const bookmarkDec = onDocumentDeleted(
    'bookmarks/{bmId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
            const snap = event.data;
            if (!snap) return;
            const { author, postId } = snap.data() as { author?: string; postId?: string; };

            if (!author || !postId) return;

            await Promise.all([
                    ds.Posts.updateCounterField(postId, 'bookmarkCount', -1),
                    ds.Users.updateCounterField(author, 'bookmarksCount', -1),
            ]);

            console.log(`❌  Bookmark removed on post ${postId} by ${author}`);
    })
);
