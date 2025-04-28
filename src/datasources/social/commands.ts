import { DataSourceManager } from '../manager';

export class SocialCommands extends DataSourceManager {
    async toggleFollow(me: string, target: string): Promise<boolean> {
        const following = this.fs('users').sub(me, 'following');
        const exists    = await (following as any).ref.doc(target).get();

        if (exists.exists) {
            await following.delete(target);
            await this.fs('users').sub(target, 'followers').delete(me);
            return false;
        }
        await following.create(target, {});
        await this.fs('users').sub(target, 'followers').create(me, {});
        return true;
    }

    async togglePostLike(user: string, postId: string): Promise<boolean> {
        const likes = this.fs('posts').sub(postId, 'likes');
        const snap  = await (likes as any).ref.doc(user).get();

        if (snap.exists) { await likes.delete(user);  return false; }
        await likes.create(user, {});                 return true;
    }

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

    async toggleCommentLike(user: string, commentId: string): Promise<boolean> {
        const likes = this.fs('comments').sub(commentId, 'likes');
        const snap  = await (likes as any).ref.doc(user).get();

        if (snap.exists) { await likes.delete(user);  return false; }
        await likes.create(user, {});                 return true;
    }
}
