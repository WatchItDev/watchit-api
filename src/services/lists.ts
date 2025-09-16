// import { toggle } from '../helpers/toggle';
import type { Post, User } from '../schema/types';
import { ServiceManager } from './manager';

export class BookmarkService extends ServiceManager {
  toggleBookmark = (addr: string, postId: string) =>
    toggle(
      () => this.ds.Bookmarks.isBookmarked(addr, postId),
      () => this.ds.Bookmarks.addBookmark(addr, postId),
      () => this.ds.Bookmarks.removeBookmark(addr, postId),
    );

  isBookmarked = (address: string, postId: string) =>
    this.ds.Bookmarks.isBookmarked(address, postId);

  getBookmarksByUser = (addr: string, limit = 50): Promise<Post[]> =>
    this.ds.Bookmarks.getBookmarksByUser(addr, limit);

  getBookmarksByPost = (postId: string, limit = 50): Promise<User[]> =>
    this.ds.Bookmarks.getBookmarksByPost(postId, limit);
}
