import { DataSourceManager } from '../manager';

export class BookmarksCommands extends DataSourceManager {
    addPostBookmark (uid: string, post: string) {
        return this.fs('posts').sub(post,'bookmarks').create(uid,{})
    }
    removePostBookmark (uid: string, post: string) {
        return this.fs('posts').sub(post,'bookmarks').delete(uid)
    }
    addUserBookmark (uid: string, post: string) {
        return this.fs('users').sub(uid ,'bookmarks').create(post,{})
    }
    removeUserBookmark (uid: string, post: string) {
        return this.fs('users').sub(uid ,'bookmarks').delete(post)
    }
}
