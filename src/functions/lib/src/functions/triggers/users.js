'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.logUserUpdated = exports.logUserCreated = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.logUserCreated = (0, firestore_1.onDocumentCreated)(
  'users/{wallet}',
  (0, manager_1.enhanceFunction)(async ({ rank, activity }, event) => {
    const { wallet } = event.params;
    const newUser = event.data.data();
    console.log(
      `👤  New user ${wallet} created (email: ${newUser.email ?? 'n/a'})`,
    );
    await activity.userRegistered(wallet);
    await rank.maybeRankUp(wallet);
    console.log(`🎉  ${wallet} promoted to watcher & perks seeded`);
  }),
);
exports.logUserUpdated = (0, firestore_1.onDocumentUpdated)(
  'users/{wallet}',
  (0, manager_1.enhanceFunction)(async ({ activity }, event) => {
    const { wallet } = event.params;
    await activity.userUpdated(wallet);
  }),
);
//# sourceMappingURL=users.js.map
