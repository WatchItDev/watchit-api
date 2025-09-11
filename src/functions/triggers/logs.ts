import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import type { LogEvt } from '../library/progress';
import { enhanceFunction } from '../manager';

export const eventLogProgress = onDocumentCreated(
  'eventLogs/{id}',
  enhanceFunction(async ({ progress }, evt) => {
    const log = evt.data!.data() as LogEvt;
    await progress.consume(log);
  }),
);
