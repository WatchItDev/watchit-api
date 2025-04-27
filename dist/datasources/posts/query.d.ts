import { DataSourceManager } from '../manager.js';
import { Post } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class PostsQuery extends DataSourceManager {
    getPost(id: string): Promise<Post | null>;
    getPostsByAuthor(author: string, limit?: number): Promise<Post[]>;
    recentPosts(limit?: number): Promise<Post[]>;
    popularPosts(limit?: number): Promise<Post[]>;
    allPosts(): Promise<Post[]>;
}

export { PostsQuery };
