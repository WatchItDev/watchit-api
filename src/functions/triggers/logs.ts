import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceFunction } from '../manager';
import type { LogEvt } from '../library/progress';

export const eventLogProgress = onDocumentCreated(
  'eventLogs/{id}',
  enhanceFunction(async ({ progress }, evt) => {
    const log = evt.data!.data() as LogEvt;
    await progress.consume(log);
  }),
);
