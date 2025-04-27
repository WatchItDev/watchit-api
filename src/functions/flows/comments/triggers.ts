import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                           from '../../manager'
import {ServiceParams} from "@/services/manager";

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

export const commentDeleted = onDocumentDeleted(
    'comments/{commentId}',
    enhanceTrigger(async ({ ds }, event) => {
        const old = event.data?.data();
        const postId = old?.post?.id;
        if (!postId) {
            console.warn(`commentDeleted without postId on ${event.params.commentId}`);
            return;
        }
        await ds.Posts.updateCounterField(postId, 'commentCount', -1);
        console.log(`🔥 commentDeleted for ${event.params.commentId}`);
    })
);

