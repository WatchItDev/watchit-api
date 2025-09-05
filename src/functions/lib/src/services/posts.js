'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostService = void 0;
const manager_1 = require('./manager');
class PostService extends manager_1.ServiceManager {
  /** Create a new post via Cloud Function */
  async createPost(input, address) {
    return this.ds.Posts.createPost(address, input);
  }
  /** Update an existing post via Cloud Function */
  async updatePost(input) {
    return this.ds.Posts.updatePost(input.postId, input);
  }
  /** Hide a post via Cloud Function */
  async hidePost(postId) {
    return this.ds.Posts.hidePost(postId);
  }
  /** Increment view count via Cloud Function */
  async incrementView(postId) {
    await this.ds.Posts.updateCounterField(postId, 'viewCount', 1);
    return this.ds.Posts.getPost(postId);
  }
  /** Read-only fetches */
  getPost(id) {
    return this.ds.Posts.getPost(id);
  }
  getPosts(query, limit) {
    return this.ds.Posts.getPosts(query, limit);
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
exports.PostService = PostService;
//# sourceMappingURL=posts.js.map
