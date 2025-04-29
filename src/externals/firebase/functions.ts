import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { App } from './app';
import type {
    User,
    UserInput,
    UpdateUserInput,
    Post,
    CreatePostInput,
    UpdatePostInput,
    Comment,
    CreateCommentInput,
    UpdateCommentInput, AddXPInput,
} from '@/schema/types';
import {addXP} from "@/functions/flows/xp/callables";

export const Functions = () => {
    const fn = getFunctions(App().getClient(), 'auto');

    if (process.env.NODE_ENV !== 'production') {
        const host = process.env.API_EMULATOR_HOST ?? '127.0.0.1';
        connectFunctionsEmulator(fn, host, 5001);
    }

    return {
        users: {
            create: httpsCallable<UserInput, { user: User }>(
                fn,
                'usersCallable-usersCreate'
            ),
            update: httpsCallable<UpdateUserInput & { address: string }, { user: User }>(
                fn,
                'usersCallable-usersUpdate'
            ),
        },

        posts: {
            create: httpsCallable<CreatePostInput & { authorAddress: string }, { post: Post }>(
                fn,
                'postsCallable-postsCreate'
            ),
            update: httpsCallable<UpdatePostInput, { post: Post }>(
                fn,
                'postsCallable-postsUpdate'
            ),
            delete: httpsCallable<{ postId: string }, { success: boolean }>(
                fn,
                'postsCallable-postsDelete'
            ),
            incrementView: httpsCallable<{ postId: string }, { post: Post }>(
                fn,
                'postsCallable-postsIncrementView'
            ),
        },

        comments: {
            create: httpsCallable<CreateCommentInput & { authorAddress: string }, { comment: Comment }>(
                fn,
                'commentsCallable-commentsCreate'
            ),
            update: httpsCallable<UpdateCommentInput, { comment: Comment }>(
                fn,
                'commentsCallable-commentsUpdate'
            ),
            delete: httpsCallable<{ commentId: string }, { success: boolean }>(
                fn,
                'commentsCallable-commentsDelete'
            ),
        },

        bookmarks: {
            toggleBookmark: httpsCallable<{ me: string; postId: string }, { success: boolean }>(
                fn,
                'bookmarksCallable-toggleBookmark'
            ),
        },

        follows: {
            toggleFollow: httpsCallable<{ me: string; targetAddress: string }, { success: boolean }>(
                fn,
                'followsCallable-toggleFollow'
            ),
        },

        likes: {
            togglePostLike: httpsCallable<{ me: string; postId: string }, { success: boolean }>(
                fn,
                'likesCallable-togglePostLike'
            ),
            toggleCommentLike: httpsCallable<{ me: string; commentId: string }, { success: boolean }>(
                fn,
                'likesCallable-toggleCommentLike'
            ),
        },

        xp: {
            addXP: httpsCallable<AddXPInput, { success: boolean }>(fn, 'xpCallable-addXP'),
        },
    };
};
