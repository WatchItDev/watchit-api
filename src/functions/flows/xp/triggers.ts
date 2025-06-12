import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }    from '../../manager'
import type { ServiceParams } from '../../../services/manager'

export const xpBalanceUpdater = onDocumentCreated(
    'xpEntries/{entryId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
            const snap = event.data
            if (!snap) return
            const { user, amount } = snap.data() as { user?: string; amount?: number }
            if (!user || typeof amount !== 'number') return

            await ds.Users.updateCounterField(user, 'xpBalance', amount)

            if (amount > 0) {
                    await ds.Users.updateCounterField(user, 'xpTotal', amount)
            }

            console.log(`⭐️ XP balance Δ ${amount} — total updated ${amount > 0 ? 'yes' : 'no'}`)
    })
)
