import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger }    from '../../manager';
import type { LogEvt }       from '../../processors/progress.ts';

export const eventLogProgress = onDocumentCreated(
    'eventLogs/{id}',
    enhanceTrigger(async ({ progress }, evt) => {
        const log = evt.data!.data() as LogEvt;
        await progress.consume(log);
    }),
);
