import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                    from '../../../services/manager'

export const postLikeCountInc = onDocumentCreated(
    'posts/{postId}/likes/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { postId, userId } = event.params
        if (!postId || !userId) return
        await ds.Posts.updateCounterField(postId, 'likeCount', +1)
        console.log(`👍 Post ${postId} liked by ${userId}`)
    })
)

export const postLikeCountDec = onDocumentDeleted(
    'posts/{postId}/likes/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { postId, userId } = event.params
        if (!postId || !userId) return
        await ds.Posts.updateCounterField(postId, 'likeCount', -1)
        console.log(`👎 Post ${postId} unliked by ${userId}`)
    })
)

export const commentLikeInc = onDocumentCreated(
    'comments/{commentId}/likes/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { commentId, userId } = event.params
        if (!commentId || !userId) return
        await ds.Comments.updateCounterField(commentId, 'likeCount', +1)
        console.log(`👍 Comment ${commentId} liked by ${userId}`)
    })
)

export const commentLikeDec = onDocumentDeleted(
    'comments/{commentId}/likes/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { commentId, userId } = event.params
        if (!commentId || !userId) return
        await ds.Comments.updateCounterField(commentId, 'likeCount', -1)
        console.log(`👎 Comment ${commentId} unliked by ${userId}`)
    })
)
