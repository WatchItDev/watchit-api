import { DataSourceManager } from '../manager';

export class BookmarksCommands extends DataSourceManager {
    async toggleBookmark(user: string, postId: string): Promise<boolean> {
        const postsBms  = this.fs('posts').sub(postId, 'bookmarks');
        const userBms   = this.fs('users').sub(user,  'bookmarks');
        const snap      = await (postsBms as any).ref.doc(user).get();

        if (snap.exists) {
            await postsBms.delete(user);
            await userBms.delete(postId);
            return false;
        }
        await postsBms.create(user, {});
        await userBms.create(postId, {});
        return true;
    }
}
