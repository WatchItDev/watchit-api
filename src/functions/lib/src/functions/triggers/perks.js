'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.unlockedPerkClaimed = exports.unlockedPerkCreated = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.unlockedPerkCreated = (0, firestore_1.onDocumentCreated)(
  'userPerkState/{id}',
  (0, manager_1.enhanceFunction)(async ({ perk }, e) => {
    const { perkId, user } = e.data.data();
    await perk.maybeAutoApply(perkId, user);
  }),
);
exports.unlockedPerkClaimed = (0, firestore_1.onDocumentUpdated)(
  'userPerkState/{id}',
  (0, manager_1.enhanceFunction)(async ({ perk, ds }, e) => {
    const before = e.data.before.data();
    const after = e.data.after.data();
    if (before.collectedAt || !after.collectedAt) return;
    const meta = (await ds.Perks.getCatalog()).find(
      (p) => p.id === after.perkId,
    );
    if (!meta || meta.executionRule.type === 'IMMEDIATE') return;
    await perk.claim(after.perkId, after.user);
  }),
);
//# sourceMappingURL=perks.js.map
