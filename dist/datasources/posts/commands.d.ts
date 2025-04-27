import { DataSourceManager } from '../manager.js';
import { CreatePostInput, Post, UpdatePostInput } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class PostsCommands extends DataSourceManager {
    createPost(authorAddress: string, input: CreatePostInput): Promise<Post>;
    updatePost(postId: string, patch: Partial<Omit<UpdatePostInput, 'postId'>>): Promise<Post | null>;
    deletePost(postId: string): Promise<void>;
    updateCounterField(postId: string, field: keyof Pick<Post, 'commentCount' | 'likeCount' | 'bookmarkCount' | 'viewCount'>, delta: number): Promise<void>;
}

export { PostsCommands };
