import {onDocumentCreated, onDocumentUpdated} from 'firebase-functions/v2/firestore'
import { enhanceTrigger } from '../../manager'
import {ServiceParams} from "../../../services/manager";

export const commentCreated = onDocumentCreated(
    'comments/{commentId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const c = await ds.Comments.getComment(event.params.commentId)
        const postId = c?.post.id
        if (!postId) {
            console.warn(`commentCreated without postId on ${event.params.commentId}`)
            return
        }
        await ds.Posts.updateCounterField(postId, 'commentCount', +1)
        console.log(`🔥 commentCreated for ${event.params.commentId}`)
    })
)

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

