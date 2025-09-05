'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookmarksCommands = void 0;
const manager_1 = require('../manager');
class BookmarksCommands extends manager_1.DataSourceManager {
  addBookmark(address, postId) {
    return this.fs('bookmarks').create(`${address}_${postId}`, {
      postId,
      author: address,
      createdAt: Date.now(),
    });
  }
  removeBookmark(address, postId) {
    return this.fs('bookmarks').delete(`${address}_${postId}`);
  }
}
exports.BookmarksCommands = BookmarksCommands;
//# sourceMappingURL=commands.js.map
