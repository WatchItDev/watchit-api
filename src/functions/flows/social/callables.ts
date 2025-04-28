import 'reflect-metadata';
import { onCall }          from 'firebase-functions/v2/https';
import { enhanceFunction } from '../../manager';

import type {
    FollowInput, LikePostInput,
    BookmarkPostInput, LikeCommentInput
} from '../../../schema/types';

/* ---------- follow / unfollow (toggle) -------- */
export const toggleFollow = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, targetAddress } = req.data as FollowInput & { me: string };
        const success = await ds.Social.toggleFollow(me, targetAddress);
        return { success };
    }),
);

/* ---------- like / unlike post (toggle) ------- */
export const togglePostLike = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, postId } = req.data as LikePostInput & { me: string };
        const success = await ds.Social.togglePostLike(me, postId);
        return { success };
    }),
);

/* ---------- bookmark / unbookmark post -------- */
export const toggleBookmark = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, postId } = req.data as BookmarkPostInput & { me: string };
        const success = await ds.Social.toggleBookmark(me, postId);
        return { success };
    }),
);

/* ---------- like / unlike comment ------------- */
export const toggleCommentLike = onCall(
    { region: 'auto' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, commentId } = req.data as LikeCommentInput & { me: string };
        const success = await ds.Social.toggleCommentLike(me, commentId);
        return { success };
    }),
);
