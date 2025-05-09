import { ServiceManager } from './manager';

export class BookmarkService extends ServiceManager {
    toggleBookmark    = (me: string, postId: string)       =>
        this.ext.Functions().bookmarks.toggleBookmark({ me, postId })
            .then(r => r.data.success);

    isBookmarked = (postId: string, me: string) =>
        this.ds.Bookmarks.isBookmarked(postId, me);
}
