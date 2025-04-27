import { ServiceManager } from "./manager";
class PostService extends ServiceManager {
  /** Create a new post via Cloud Function */
  async createPost(input) {
    const res = await this.ext.Functions().posts.create(input);
    return res.data.post;
  }
  /** Update an existing post via Cloud Function */
  async updatePost(input) {
    const res = await this.ext.Functions().posts.update(input);
    return res.data.post;
  }
  /** Delete a post via Cloud Function */
  async deletePost(postId) {
    const res = await this.ext.Functions().posts.delete({ postId });
    return res.data.success;
  }
  /** Increment view count via Cloud Function */
  async incrementView(postId) {
    const res = await this.ext.Functions().posts.incrementView({ postId });
    return res.data.post;
  }
  /** Read-only fetches */
  getPost(id) {
    return this.ds.Posts.getPost(id);
  }
  getPostsByAuthor(author, limit) {
    return this.ds.Posts.getPostsByAuthor(author, limit);
  }
  recentPosts(limit) {
    return this.ds.Posts.recentPosts(limit);
  }
  popularPosts(limit) {
    return this.ds.Posts.popularPosts(limit);
  }
}
export {
  PostService
};
//# sourceMappingURL=posts.js.map