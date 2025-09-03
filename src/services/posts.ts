import { ServiceManager } from "./manager";
import type { Post, CreatePostInput, UpdatePostInput } from "@/schema/types";

export class PostService extends ServiceManager {
  /** Create a new post via Cloud Function */
  async createPost(input: CreatePostInput, address: string): Promise<Post> {
    return this.ds.Posts.createPost(address, input);
  }

  /** Update an existing post via Cloud Function */
  async updatePost(input: UpdatePostInput): Promise<Post | null> {
    return this.ds.Posts.updatePost(input.postId, input);
  }

  /** Hide a post via Cloud Function */
  async hidePost(postId: string): Promise<void> {
    return this.ds.Posts.hidePost(postId);
  }

  /** Increment view count via Cloud Function */
  async incrementView(postId: string): Promise<Post | null> {
    await this.ds.Posts.updateCounterField(postId, "viewCount", 1);
    return this.ds.Posts.getPost(postId);
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
