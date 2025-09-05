'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostsQuery = void 0;
const manager_1 = require('../manager');
class PostsQuery extends manager_1.DataSourceManager {
  async getPost(id) {
    const p = await this.fs('posts').get(id);
    return p && !p.hidden ? p : null;
  }
  getPosts = async (q, limit = 50) => {
    if (!q) return [];
    return this.fs('posts').search(q, limit, true);
  };
  async getPostsByAuthor(author, limit = 20) {
    return this.fs('posts').query(
      [
        { field: 'author.address', op: '==', value: author },
        { field: 'hidden', op: '==', value: false },
      ],
      { limit },
    );
  }
  async recentPosts(limit = 20) {
    const dao = this.fs('posts');
    const snap = await dao.ref
      .where('hidden', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((d) => d.data());
  }
  async popularPosts(limit = 20) {
    const dao = this.fs('posts');
    const snap = await dao.ref
      .where('hidden', '==', false)
      .orderBy('likeCount', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((d) => d.data());
  }
  async allPosts() {
    return this.fs('posts').query(
      [{ field: 'hidden', op: '==', value: false }],
      {},
    );
  }
}
exports.PostsQuery = PostsQuery;
//# sourceMappingURL=query.js.map
