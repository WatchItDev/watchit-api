import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }    from '../../manager'

export const eventLogProgress = onDocumentCreated(
    'eventLogs/{id}',
    enhanceTrigger(async ({ progress }, evt) => {
            const log = evt.data!.data()
            await progress.consume(log)
    }),
)
