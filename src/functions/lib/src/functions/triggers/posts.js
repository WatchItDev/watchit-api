'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.postHidden = exports.postCreated = void 0;
const firestore_1 = require('firebase-functions/v2/firestore');
const manager_1 = require('../manager');
exports.postCreated = (0, firestore_1.onDocumentCreated)(
  'posts/{postId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity, ext }, event) => {
    const post = await ds.Posts.getPost(event.params.postId);
    const authorizedUser = post?.author.address;
    if (!authorizedUser) {
      console.warn(`postCreated without author on ${event.params.postId}`);
      return;
    }
    await Promise.resolve([
      ds.Users.updateCounterField(authorizedUser, 'publicationsCount', +1),
      activity.postCreated(authorizedUser, event.params.postId),
    ]);
    console.log(`postCreated for ${event.params.postId}`);
  }),
);
exports.postHidden = (0, firestore_1.onDocumentUpdated)(
  'posts/{postId}',
  (0, manager_1.enhanceFunction)(async ({ ds, activity }, event) => {
    const wasHidden = event?.data?.before.data();
    const currentlyHidden = event?.data?.after.data();
    const authorized = currentlyHidden?.author?.address;
    if ((wasHidden?.hidden && !currentlyHidden?.hidden) || !authorized) return;
    await Promise.resolve([
      ds.Users.updateCounterField(authorized, 'publicationsCount', -1),
      activity.postHidden(authorized, event.params.postId),
    ]);
    console.log(`postHidden for ${event.params.postId}`);
  }),
);
//# sourceMappingURL=posts.js.map
