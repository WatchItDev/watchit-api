import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                   from '../../../services/manager'

export const followInc = onDocumentCreated(
    'follows/{relId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const snap = event.data
        if (!snap) return
        const { follower, following } = snap.data() as { follower?: string; following?: string }
        if (!follower || !following) return

        await Promise.all([
            ds.Users.updateCounterField(following, 'followersCount', +1),
            ds.Users.updateCounterField(follower,  'followingCount', +1),
        ])
        console.log(`➕ ${follower} now follows ${following}`)
    })
)

export const followDec = onDocumentDeleted(
    'follows/{relId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const snap = event.data
        if (!snap) return
        const { follower, following } = snap.data() as { follower?: string; following?: string }
        if (!follower || !following) return

        await Promise.all([
            ds.Users.updateCounterField(following, 'followersCount', -1),
            ds.Users.updateCounterField(follower,  'followingCount', -1),
        ])
        console.log(`➖ ${follower} unfollowed ${following}`)
    })
)
