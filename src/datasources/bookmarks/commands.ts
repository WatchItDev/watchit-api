import { DataSourceManager } from '../manager'

export class BookmarksCommands extends DataSourceManager {
    addBookmark(address: string, postId: string) {
        return this.fs('bookmarks').create(`${address}_${postId}`, {
            author: address,
            postId,
            createdAt: Date.now(),
        })
    }

    removeBookmark(address: string, postId: string) {
        return this.fs('bookmarks').delete(`${address}_${postId}`)
    }
}
