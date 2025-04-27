import { ServiceManager } from './manager.js';
import { CreatePostInput, Post, UpdatePostInput } from '../schema/types.js';
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

declare class PostService extends ServiceManager {
    /** Create a new post via Cloud Function */
    createPost(input: CreatePostInput): Promise<Post>;
    /** Update an existing post via Cloud Function */
    updatePost(input: UpdatePostInput): Promise<Post | null>;
    /** Delete a post via Cloud Function */
    deletePost(postId: string): Promise<boolean>;
    /** Increment view count via Cloud Function */
    incrementView(postId: string): Promise<Post | null>;
    /** Read-only fetches */
    getPost(id: string): Promise<Post | null>;
    getPostsByAuthor(author: string, limit?: number): Promise<Post[]>;
    recentPosts(limit?: number): Promise<Post[]>;
    popularPosts(limit?: number): Promise<Post[]>;
}

export { PostService };
