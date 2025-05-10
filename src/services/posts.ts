import { ServiceManager } from './manager';
import type {
    Post,
    CreatePostInput,
    UpdatePostInput
} from '@/schema/types';

export class PostService extends ServiceManager {
    /** Create a new post via Cloud Function */
    async createPost(input: CreatePostInput, authorAddress: string): Promise<Post> {
        const res = await this.ext
            .Functions()
            .posts.create({ ...input, authorAddress});
        return res.data.post;
    }

    /** Update an existing post via Cloud Function */
    async updatePost(input: UpdatePostInput): Promise<Post | null> {
        const res = await this.ext
            .Functions()
            .posts.update(input);
        return res.data.post;
    }

    /** Hide a post via Cloud Function */
    async hidePost(postId: string): Promise<boolean> {
        const res = await this.ext
            .Functions()
            .posts.hide({ postId });
        return res.data.success;
    }

    /** Increment view count via Cloud Function */
    async incrementView(postId: string): Promise<Post | null> {
        const res = await this.ext
            .Functions()
            .posts.incrementView({ postId });
        return res.data.post;
    }

    /** Read-only fetches */
    getPost(id: string): Promise<Post | null> {
        return this.ds.Posts.getPost(id);
    }

    getPosts(query: string, limit?: number): Promise<Post[]> {
        return this.ds.Posts.getPosts(query, limit);
    }

    getPostsByAuthor(author: string, limit?: number): Promise<Post[]> {
        return this.ds.Posts.getPostsByAuthor(author, limit);
    }

    recentPosts(limit?: number): Promise<Post[]> {
        return this.ds.Posts.recentPosts(limit);
    }

    popularPosts(limit?: number): Promise<Post[]> {
        return this.ds.Posts.popularPosts(limit);
    }
}
