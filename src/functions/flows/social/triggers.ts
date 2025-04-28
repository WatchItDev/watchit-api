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

export const postBookmarkCountInc = onDocumentCreated(
    'posts/{postId}/bookmarks/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { postId, userId } = event.params
        if (!postId || !userId) return
        await ds.Posts.updateCounterField(postId, 'bookmarkCount', +1)
        await ds.Users.updateCounterField(userId, 'bookmarksCount', +1)
        console.log(`🔖 Post ${postId} bookmarked by ${userId}`)
    })
)

export const postBookmarkCountDec = onDocumentDeleted(
    'posts/{postId}/bookmarks/{userId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { postId, userId } = event.params
        if (!postId || !userId) return
        await ds.Posts.updateCounterField(postId, 'bookmarkCount', -1)
        await ds.Users.updateCounterField(userId, 'bookmarksCount', -1)
        console.log(`❌ Bookmark removed on post ${postId} by ${userId}`)
    })
)

export const followInc = onDocumentCreated(
    'users/{target}/followers/{me}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { target, me } = event.params
        if (!target || !me) return
        await Promise.all([
            ds.Users.updateCounterField( target, 'followersCount', +1),
            ds.Users.updateCounterField( me,     'followingCount', +1),
        ])
        console.log(`➕ ${me} now follows ${target}`)
    })
)

export const followDec = onDocumentDeleted(
    'users/{target}/followers/{me}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const { target, me } = event.params
        if (!target || !me) return
        await Promise.all([
            ds.Users.updateCounterField( target, 'followersCount', -1),
            ds.Users.updateCounterField( me,     'followingCount', -1),
        ])
        console.log(`➖ ${me} unfollowed ${target}`)
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
