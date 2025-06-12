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
            console.warn(`commentCreated without postId on ${commentId}`);
            return;
        }
        await ds.Posts.updateCounterField(postId, 'commentCount', +1);
        console.log(`🔥 commentCreated ${commentId} → post ${postId}`);
    }),
);

export const commentHidden = onDocumentUpdated(
    'comments/{commentId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const change = event.data;
        if (!change?.before || !change?.after) {
            console.warn(`commentHidden: without change data for ${event.params.commentId}`);
            return;
        }

        const before = change.before.data();
        const after  = change.after.data();

        if (!before.hidden && after.hidden) {
            const commentId       = event.params.commentId;
            const parentCommentId = after.parentCommentId;
            const postId          = after.postId;

            if (parentCommentId) {
                await ds.Comments.updateCounterField(parentCommentId, 'repliesCount', -1);
                console.log(`🔥 replyHidden ${commentId} → parent ${parentCommentId}`);
            } else if (postId) {
                await ds.Posts.updateCounterField(postId, 'commentCount', -1);
                console.log(`🔥 commentHidden ${commentId} → post ${postId}`);
            } else {
                console.warn(`commentHidden without parentCommentId and postId on ${commentId}`);
            }
        }
    })
);
