'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.likeDec = exports.likeInc = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.likeInc = (0, firestore_1.onDocumentCreated)(
  'likes/{likeId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { targetId, targetType, author, owner } = snap.data();
    if (!targetId || !targetType) return;
    if (targetType === 'POST') {
      await ds.Posts.updateCounterField(targetId, 'likeCount', +1);
      console.log(`Post ${targetId} liked`);
    }
    if (targetType === 'COMMENT') {
      await ds.Comments.updateCounterField(targetId, 'likeCount', +1);
      console.log(`Comment ${targetId} liked`);
    }
    await activity.likeCreated(author, targetId, targetType, { owner });
  }),
);
exports.likeDec = (0, firestore_1.onDocumentDeleted)(
  'likes/{likeId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { targetId, targetType, author } = snap.data();
    if (!targetId || !targetType) return;
    if (targetType === 'POST') {
      await ds.Posts.updateCounterField(targetId, 'likeCount', -1);
      console.log(`👎  Post ${targetId} unliked`);
    }
    if (targetType === 'COMMENT') {
      await ds.Comments.updateCounterField(targetId, 'likeCount', -1);
      console.log(`👎  Comment ${targetId} unliked`);
    }
    await activity.likeRemoved(author, targetId, targetType);
  }),
);
//# sourceMappingURL=likes.js.map
