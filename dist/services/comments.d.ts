import { ServiceManager } from './manager.js';
import { CreateCommentInput, Comment, UpdateCommentInput } from '../schema/types.js';
import '../datasources/index.js';
import '../datasources/types.js';
import '../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import '../datasources/users/index.js';
import 'ts-mixer/dist/types/types';
import '../datasources/users/query.js';
import '../datasources/manager.js';
import '../datasources/users/commands.js';
import '../datasources/posts/index.js';
import '../datasources/posts/query.js';
import '../datasources/posts/commands.js';
import '../datasources/comments/index.js';
import '../datasources/comments/query.js';
import '../datasources/comments/commands.js';
import '../index-Ced-t-wv.js';
import '../externals/firebase/app.js';
import '@firebase/app';
import 'firebase-admin/app';
import '../externals/firebase/functions.js';
import '@firebase/functions';
import 'graphql';

declare class CommentService extends ServiceManager {
    /** Create a comment via Cloud Function */
    createComment(input: CreateCommentInput): Promise<Comment>;
    /** Update a comment via Cloud Function */
    updateComment(input: UpdateCommentInput): Promise<Comment | null>;
    /** Delete a comment via Cloud Function */
    deleteComment(commentId: string): Promise<boolean>;
    /** Read-only fetches */
    getComment(id: string): Promise<Comment | null>;
    getCommentsByPost(postId: string, limit?: number): Promise<Comment[]>;
    getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]>;
}

export { CommentService };
