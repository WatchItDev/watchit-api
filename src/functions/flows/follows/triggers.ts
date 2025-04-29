import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'
import type { ServiceParams }                    from '../../../services/manager'

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
