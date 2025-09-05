'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookmarksQuery = void 0;
const manager_1 = require('../manager');
class BookmarksQuery extends manager_1.DataSourceManager {
  isBookmarked(address, postId) {
    return this.fs('bookmarks').exists(`${address}_${postId}`);
  }
  async getBookmarksByUser(address, limit = 50) {
    const rows = await this.fs('bookmarks').query(
      [{ field: 'author', op: '==', value: address }],
      { limit },
    );
    if (!rows.length) return [];
    const posts = await Promise.all(
      rows.map((r) => this.fs('posts').get(r.postId)),
    );
    return posts.filter(Boolean);
  }
  async getBookmarksByPost(postId, limit = 50) {
    const rows = await this.fs('bookmarks').query(
      [{ field: 'postId', op: '==', value: postId }],
      { limit },
    );
    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs('users').get(r.author)),
    );
    return users.filter(Boolean);
  }
}
exports.BookmarksQuery = BookmarksQuery;
//# sourceMappingURL=query.js.map
