'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookmarkService = void 0;
const manager_1 = require('./manager');
const toggle_1 = require('../helpers/toggle');
class BookmarkService extends manager_1.ServiceManager {
  toggleBookmark = (addr, postId) =>
    (0, toggle_1.toggle)(
      () => this.ds.Bookmarks.isBookmarked(addr, postId),
      () => this.ds.Bookmarks.addBookmark(addr, postId),
      () => this.ds.Bookmarks.removeBookmark(addr, postId),
    );
  isBookmarked = (address, postId) =>
    this.ds.Bookmarks.isBookmarked(address, postId);
  getBookmarksByUser = (addr, limit = 50) =>
    this.ds.Bookmarks.getBookmarksByUser(addr, limit);
  getBookmarksByPost = (postId, limit = 50) =>
    this.ds.Bookmarks.getBookmarksByPost(postId, limit);
}
exports.BookmarkService = BookmarkService;
//# sourceMappingURL=bookmarks.js.map
