import { ServiceManager } from './manager';
import type {
    Post,
    CreatePostInput,
    UpdatePostInput
} from '@/schema/types';

export class PostService extends ServiceManager {
    /** Create a new post via Cloud Function */
    async createPost(
        input: CreatePostInput
    ): Promise<Post> {
        const res = await this.ext
            .Functions()
            .posts.create(input);
        return res.data.post;
    }

    /** Update an existing post via Cloud Function */
    async updatePost(input: UpdatePostInput): Promise<Post | null> {
        const res = await this.ext
            .Functions()
            .posts.update(input);
        return res.data.post;
    }

    /** Delete a post via Cloud Function */
    async deletePost(postId: string): Promise<boolean> {
        const res = await this.ext
            .Functions()
            .posts.delete({ postId });
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
