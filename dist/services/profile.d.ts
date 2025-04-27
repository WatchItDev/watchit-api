import { ServiceManager } from './manager.js';
import { UserInput, User, UpdateUserInput, Post } from '../schema/types.js';
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

declare class ProfileService extends ServiceManager {
    /** Create a new user via Cloud Function */
    createProfile(input: UserInput): Promise<User>;
    /** Update current user via Cloud Function */
    updateProfile(input: UpdateUserInput): Promise<User>;
    /** Read operations directly against the datasource */
    getProfile(address: string): Promise<User | null>;
    getUsers(prefix: string, limit?: number): Promise<User[]>;
    getFollowers(address: string): Promise<User[]>;
    getFollowing(address: string): Promise<User[]>;
    getPublications(address: string, limit?: number): Promise<Post[]>;
    getBookmarks(address: string): Promise<Post[]>;
}

export { ProfileService };
