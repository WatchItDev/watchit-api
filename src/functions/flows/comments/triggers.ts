import {onDocumentCreated, onDocumentUpdated} from 'firebase-functions/v2/firestore'
import { enhanceTrigger } from '../../manager'
import {ServiceParams} from "../../../services/manager";

export const commentCreated = onDocumentCreated(
    'comments/{commentId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const commentId = event.params.commentId;
        const c = await ds.Comments.getComment(commentId);
        if (!c) return;

        if (c?.parentComment?.id) {
            await ds.Comments.updateCounterField(c?.parentComment?.id, 'repliesCount', +1);
            console.log(`🔥 replyCreated ${commentId} → parent ${c?.parentComment?.id}`);
            return;
        }

        const postId = c.post?.id;
        if (!postId) {
            console.warn(`commentCreated sin postId en ${commentId}`);
            return;
        }
        await ds.Posts.updateCounterField(postId, 'commentCount', +1);
        console.log(`🔥 commentCreated ${commentId} → post ${postId}`);
    }),
);

export const commentHidden = onDocumentUpdated(
    'comments/{commentId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const before = event?.data?.before.data();
        const after  = event?.data?.after.data();

        if (!before?.hidden && after?.hidden) {
            const postId = after.postId;
            if (!postId) {
                console.warn(`commentHidden without postId on ${event.params.commentId}`);
                return;
            }

            await ds.Posts.updateCounterField(postId, 'commentCount', -1);
            console.log(`🔥 commentHidden for ${event.params.commentId}`);
        }
    })
);

