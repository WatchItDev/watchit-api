import 'reflect-metadata';
import { onCall }          from 'firebase-functions/v2/https';
import { enhanceFunction } from '../../manager';
import type { BookmarkPostInput } from '../../../schema/types';

/* ---------- bookmark / unbookmark post -------- */
export const toggleBookmark = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, postId } = req.data as BookmarkPostInput & { me: string };
        const success = await ds.Bookmarks.toggleBookmark(me, postId);
        return { success };
    }),
);
