'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.bookmarkDec = exports.bookmarkInc = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.bookmarkInc = (0, firestore_1.onDocumentCreated)(
  'bookmarks/{bmId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { author, postId, owner } = snap.data();
    if (!author || !postId) return;
    await Promise.all([
      ds.Posts.updateCounterField(postId, 'bookmarkCount', +1),
      ds.Users.updateCounterField(author, 'bookmarksCount', +1),
      activity.bookmarkCreated(author, postId, { owner }),
    ]);
    console.log(`Post ${postId} bookmarked by ${author}`);
  }),
);
exports.bookmarkDec = (0, firestore_1.onDocumentDeleted)(
  'bookmarks/{bmId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const snap = event.data;
    if (!snap) return;
    const { author, postId } = snap.data();
    if (!author || !postId) return;
    await Promise.all([
      ds.Posts.updateCounterField(postId, 'bookmarkCount', -1),
      ds.Users.updateCounterField(author, 'bookmarksCount', -1),
      activity.bookmarkRemoved(author, postId),
    ]);
    console.log(`Bookmark removed on post ${postId} by ${author}`);
  }),
);
//# sourceMappingURL=bookmarks.js.map
