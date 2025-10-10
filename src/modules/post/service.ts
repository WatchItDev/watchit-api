import type { Repo } from '@/infra/database';
import type { CreatePostDTO, Post, PostFilter } from '@/modules/post/types';
import type { Context } from '@/modules/types';

export const PostService = (ctx: Context) => ({
  /** Create a new post via Cloud Function */
  async createPost(input: CreatePostDTO): Promise<Post> {
    const { userId, title, body, tags } = input;
    return ctx.ds.Post.create({ body, title, tags, userId });
  },

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
  getPost(input: Id): Promise<Post | null> {
    return ctx.ds.Post.getPost(input);
  },

  async getPosts(input: PostFilter, page?: Pagination): Promise<Post[]> {
    const where: Repo.PostWhereInput | undefined =
      input.userId !== undefined ? { base: { userId: input.userId } } : undefined;

    return ctx.ds.Post.getPosts(where, page);
  },

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
});
