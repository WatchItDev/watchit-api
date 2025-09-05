'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.followDec = exports.followInc = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.followInc = (0, firestore_1.onDocumentCreated)(
  'follows/{relId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { follower, following } = snap.data();
    if (!follower || !following) return;
    await Promise.all([
      ds.Users.updateCounterField(following, 'followersCount', +1),
      ds.Users.updateCounterField(follower, 'followingCount', +1),
      activity.followCreated(follower, following),
    ]);
    console.log(`${follower} now follows ${following}`);
  }),
);
exports.followDec = (0, firestore_1.onDocumentDeleted)(
  'follows/{relId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { follower, following } = snap.data();
    if (!follower || !following) return;
    await Promise.all([
      ds.Users.updateCounterField(following, 'followersCount', -1),
      ds.Users.updateCounterField(follower, 'followingCount', -1),
      activity.followRemoved(follower, following),
    ]);
    console.log(`${follower} unfollowed ${following}`);
  }),
);
//# sourceMappingURL=follow.js.map
