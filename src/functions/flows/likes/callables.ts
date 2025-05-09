import 'reflect-metadata';
import { onCall }          from 'firebase-functions/v2/https';
import { enhanceFunction } from '../../manager';
import type { LikePostInput, LikeCommentInput } from '../../../schema/types';

/* ---------- like / unlike post (toggle) ------- */
export const togglePostLike = onCall(
    { region: 'us-central1' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, postId } = req.data as LikePostInput & { me: string };
        const success = await ds.Likes.togglePostLike(me, postId);
        return { success };
    }),
);

/* ---------- like / unlike comment ------------- */
export const toggleCommentLike = onCall(
    { region: 'us-central1' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, commentId } = req.data as LikeCommentInput & { me: string };
        const success = await ds.Likes.toggleCommentLike(me, commentId);
        return { success };
    }),
);
