import { DataSourceManager } from '../manager.js';
import { User, Post } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class UsersQuery extends DataSourceManager {
    getUser: (addr: string) => Promise<User | null>;
    getUsers: (q: string, limit?: number) => Promise<User[]>;
    getFollowers(address: string, limit?: number): Promise<User[]>;
    getFollowing(address: string, limit?: number): Promise<User[]>;
    getPublications(address: string, limit?: number): Promise<Post[]>;
    getBookmarks(address: string, limit?: number): Promise<Post[]>;
}

export { UsersQuery };
