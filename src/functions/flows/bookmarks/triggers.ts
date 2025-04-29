import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                    from '../../../services/manager'

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
