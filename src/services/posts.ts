import type { CreatePostInput, PostByIdentifierInput, UpdatePostInput } from '@/schema/types';
import { ContentKind, PostContent, PostId, UserId } from '@/externals/prisma';
import { ServiceManager } from './manager';

export type CreatePostDTO = CreatePostInput & UserId;
export type UpdatePostDTO = UpdatePostInput & PostId;

export class PostService extends ServiceManager {
  /** Create a new post via Cloud Function */
  async createPost(input: CreatePostDTO): Promise<PostContent> {
    const { userId, visibility, ...postInput } = input;
    return this.ds.Posts.create({
      base: { userId, kind: ContentKind.POST, visibility },
      ...postInput,
    });
  }

  // /** Update an existing post via Cloud Function */
  // async updatePost(input: UpdatePost): Promise<Post | null> {
  //   return this.ds.Posts.update(input);
  // }

  // /** Hide a post via Cloud Function */
  // async hidePost(postId: string): Promise<void> {
  //   return this.ds.Posts.hidePost(postId);
  // }

  // /** Increment view count via Cloud Function */
  // async incrementView(postId: string): Promise<Post | null> {
  //   await this.ds.Posts.updateCounterField(postId, 'viewCount', 1);
  //   return this.ds.Posts.getPost(postId);
  // }

  /** Read-only fetches */
  getPost(input: PostByIdentifierInput): Promise<PostContent | null> {
    return this.ds.Posts.getPost(input);
  }

  // getPosts(query: string, limit?: number): Promise<Post[]> {
  //   return this.ds.Posts.getPosts(query, limit);
  // }

  // getPostsByAuthor(author: string, limit?: number): Promise<Post[]> {
  //   return this.ds.Posts.getPostsByAuthor(author, limit);
  // }

  // recentPosts(limit?: number): Promise<Post[]> {
  //   return this.ds.Posts.recentPosts(limit);
  // }

  // popularPosts(limit?: number): Promise<Post[]> {
  //   return this.ds.Posts.popularPosts(limit);
  // }
}
