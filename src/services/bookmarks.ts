import { ServiceManager } from './manager';

export class BookmarkService extends ServiceManager {
    toggleBookmark = (me: string, postId: string) =>
        this.ds.Bookmarks.toggleBookmark(me, postId);

    isBookmarked = (postId: string, me: string) =>
        this.ds.Bookmarks.isBookmarked(postId, me);
}
