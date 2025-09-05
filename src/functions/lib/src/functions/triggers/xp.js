'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.xpEntryCreated = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
/**
 * Rank-up when a new XP entry is inserted.
 */
exports.xpEntryCreated = (0, firestore_1.onDocumentCreated)(
  'xpEntries/{id}',
  (0, manager_1.enhanceFunction)(async ({ ds, rank, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { user, amount } = snap.data();
    await ds.Users.updateCounterField(user, 'xpBalance', amount);
    if (amount > 0) await ds.Users.updateCounterField(user, 'xpTotal', amount);
    if (amount > 0) await activity.xpGained(user, amount);
    if (amount < 0) await activity.xpBurned(user, Math.abs(amount));
    await rank.maybeRankUp(user);
  }),
);
//# sourceMappingURL=xp.js.map
