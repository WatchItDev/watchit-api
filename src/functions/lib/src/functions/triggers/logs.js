'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.eventLogProgress = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.eventLogProgress = (0, firestore_1.onDocumentCreated)(
  'eventLogs/{id}',
  (0, manager_1.enhanceFunction)(async ({ progress }, evt) => {
    const log = evt.data.data();
    await progress.consume(log);
  }),
);
//# sourceMappingURL=logs.js.map
