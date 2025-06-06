import { ServiceManager } from './manager';
import { toggle } from "@/helpers/toggle";

export class BookmarkService extends ServiceManager {
    toggleBookmark    = (u: string, p: string) =>
        toggle(
            () => this.ds.Bookmarks.isBookmarked(p, u),
            [() => this.ds.Bookmarks.addPostBookmark(u, p), () => this.ds.Bookmarks.addUserBookmark(u, p)],
            [() => this.ds.Bookmarks.removePostBookmark(u, p), () => this.ds.Bookmarks.removeUserBookmark(u, p)]
        );

    isBookmarked = (postId: string, me: string) =>
        this.ds.Bookmarks.isBookmarked(postId, me);
}
