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
    UpdateCommentInput,
} from '@/schema/types';

export const Functions = () => {
    const fn = getFunctions(App().getClient(), 'auto');

    if (process.env.NODE_ENV !== 'production') {
        const host = process.env.EMULATOR_HOST ?? '127.0.0.1';
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
    };
};
