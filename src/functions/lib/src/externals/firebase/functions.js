'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Functions = void 0;
const functions_1 = require('firebase/functions');
const app_1 = require('./app');
const Functions = () => {
  const fn = (0, functions_1.getFunctions)(
    (0, app_1.App)().getClient(),
    'us-central1',
  );
  if (process.env.NODE_ENV !== 'production') {
    const host = process.env.API_EMULATOR_HOST ?? '127.0.0.1';
    (0, functions_1.connectFunctionsEmulator)(fn, host, 5001);
  }
  return {
    users: {
      create: (0, functions_1.httpsCallable)(fn, 'usersCallable-usersCreate'),
      update: (0, functions_1.httpsCallable)(fn, 'usersCallable-usersUpdate'),
    },
    posts: {
      create: (0, functions_1.httpsCallable)(fn, 'postsCallable-postsCreate'),
      update: (0, functions_1.httpsCallable)(fn, 'postsCallable-postsUpdate'),
      hide: (0, functions_1.httpsCallable)(fn, 'postsCallable-postsHide'),
      incrementView: (0, functions_1.httpsCallable)(
        fn,
        'postsCallable-postsIncrementView',
      ),
    },
    comments: {
      create: (0, functions_1.httpsCallable)(
        fn,
        'commentsCallable-commentsCreate',
      ),
      update: (0, functions_1.httpsCallable)(
        fn,
        'commentsCallable-commentsUpdate',
      ),
      hide: (0, functions_1.httpsCallable)(fn, 'commentsCallable-commentsHide'),
    },
    bookmarks: {
      toggleBookmark: (0, functions_1.httpsCallable)(
        fn,
        'bookmarksCallable-toggleBookmark',
      ),
    },
    follows: {
      toggleFollow: (0, functions_1.httpsCallable)(
        fn,
        'followsCallable-toggleFollow',
      ),
    },
    likes: {
      togglePostLike: (0, functions_1.httpsCallable)(
        fn,
        'likesCallable-togglePostLike',
      ),
      toggleCommentLike: (0, functions_1.httpsCallable)(
        fn,
        'likesCallable-toggleCommentLike',
      ),
    },
    xp: {
      addXP: (0, functions_1.httpsCallable)(fn, 'xpCallable-addXP'),
    },
  };
};
exports.Functions = Functions;
//# sourceMappingURL=functions.js.map
