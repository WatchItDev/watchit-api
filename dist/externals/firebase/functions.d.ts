import * as _firebase_functions from '@firebase/functions';
import { UserInput, User, UpdateUserInput, CreatePostInput, Post, UpdatePostInput, CreateCommentInput, Comment, UpdateCommentInput } from '../../schema/types.js';
import 'graphql';

declare const Functions: () => {
    users: {
        create: _firebase_functions.HttpsCallable<UserInput, {
            user: User;
        }, unknown>;
        update: _firebase_functions.HttpsCallable<UpdateUserInput & {
            address: string;
        }, {
            user: User;
        }, unknown>;
    };
    posts: {
        create: _firebase_functions.HttpsCallable<CreatePostInput & {
            authorAddress: string;
        }, {
            post: Post;
        }, unknown>;
        update: _firebase_functions.HttpsCallable<UpdatePostInput, {
            post: Post;
        }, unknown>;
        delete: _firebase_functions.HttpsCallable<{
            postId: string;
        }, {
            success: boolean;
        }, unknown>;
        incrementView: _firebase_functions.HttpsCallable<{
            postId: string;
        }, {
            post: Post;
        }, unknown>;
    };
    comments: {
        create: _firebase_functions.HttpsCallable<CreateCommentInput & {
            authorAddress: string;
        }, {
            comment: Comment;
        }, unknown>;
        update: _firebase_functions.HttpsCallable<UpdateCommentInput, {
            comment: Comment;
        }, unknown>;
        delete: _firebase_functions.HttpsCallable<{
            commentId: string;
        }, {
            success: boolean;
        }, unknown>;
    };
};

export { Functions };
