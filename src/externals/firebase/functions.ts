import type {
  AddXPInput,
  Comment,
  CreateCommentInput,
  CreatePostInput,
  Post,
  UpdateCommentInput,
  UpdatePostInput,
  UpdateUserInput,
  User,
  UserInput,
} from '@/graphql/types';
import { IdentifiedByAddress } from '@/types';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { App } from './app';

export const Functions = () => {
  const fn = getFunctions(App().getClient(), 'us-central1');

  if (process.env.NODE_ENV !== 'production') {
    const host = process.env.API_EMULATOR_HOST ?? '127.0.0.1';
    connectFunctionsEmulator(fn, host, 5001);
  }

  return {
    users: {
      create: httpsCallable<UserInput, { user: User }>(fn, 'usersCallable-usersCreate'),
      update: httpsCallable<UpdateUserInput & IdentifiedByAddress, { user: User }>(
        fn,
        'usersCallable-usersUpdate',
      ),
    },

    posts: {
      create: httpsCallable<CreatePostInput & IdentifiedByAddress, { post: Post }>(
        fn,
        'postsCallable-postsCreate',
      ),
      update: httpsCallable<UpdatePostInput, { post: Post }>(fn, 'postsCallable-postsUpdate'),
      hide: httpsCallable<{ postId: string }, { success: boolean }>(fn, 'postsCallable-postsHide'),
      incrementView: httpsCallable<{ postId: string }, { post: Post }>(
        fn,
        'postsCallable-postsIncrementView',
      ),
    },

    comments: {
      create: httpsCallable<CreateCommentInput & IdentifiedByAddress, { comment: Comment }>(
        fn,
        'commentsCallable-commentsCreate',
      ),
      update: httpsCallable<UpdateCommentInput, { comment: Comment }>(
        fn,
        'commentsCallable-commentsUpdate',
      ),
      hide: httpsCallable<{ commentId: string }, { success: boolean }>(
        fn,
        'commentsCallable-commentsHide',
      ),
    },

    bookmarks: {
      toggleBookmark: httpsCallable<{ me: string; postId: string }, { success: boolean }>(
        fn,
        'bookmarksCallable-toggleBookmark',
      ),
    },

    follows: {
      toggleFollow: httpsCallable<{ me: string; targetAddress: string }, { success: boolean }>(
        fn,
        'followsCallable-toggleFollow',
      ),
    },

    likes: {
      togglePostLike: httpsCallable<{ me: string; postId: string }, { success: boolean }>(
        fn,
        'likesCallable-togglePostLike',
      ),
      toggleCommentLike: httpsCallable<{ me: string; commentId: string }, { success: boolean }>(
        fn,
        'likesCallable-toggleCommentLike',
      ),
    },

    xp: {
      addXP: httpsCallable<AddXPInput, { success: boolean }>(fn, 'xpCallable-addXP'),
    },
  };
};
