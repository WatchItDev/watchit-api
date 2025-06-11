import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                   from '../../../services/manager'

interface LikeDoc {
    author?:     string
    targetId?:   string
    targetType?: 'POST' | 'COMMENT'
}

export const likeInc = onDocumentCreated(
    'likes/{likeId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const snap = event.data
        if (!snap) return

        const { targetId, targetType } = snap.data() as LikeDoc
        if (!targetId || !targetType) return

        if (targetType === 'POST') {
            await ds.Posts.updateCounterField(targetId, 'likeCount', +1)
            console.log(`👍  Post ${targetId} liked`)
        }
        if (targetType === 'COMMENT') {
            await ds.Comments.updateCounterField(targetId, 'likeCount', +1)
            console.log(`👍  Comment ${targetId} liked`)
        }
    })
)

export const likeDec = onDocumentDeleted(
    'likes/{likeId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const snap = event.data
        if (!snap) return

        const { targetId, targetType } = snap.data() as LikeDoc
        if (!targetId || !targetType) return

        if (targetType === 'POST') {
            await ds.Posts.updateCounterField(targetId, 'likeCount', -1)
            console.log(`👎  Post ${targetId} unliked`)
        }
        if (targetType === 'COMMENT') {
            await ds.Comments.updateCounterField(targetId, 'likeCount', -1)
            console.log(`👎  Comment ${targetId} unliked`)
        }
    })
)
