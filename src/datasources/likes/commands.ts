import { DataSourceManager } from '../manager';

export class LikesCommands extends DataSourceManager {
    async togglePostLike(user: string, postId: string): Promise<boolean> {
        const likes = this.fs('posts').sub(postId, 'likes');
        const snap  = await (likes as any).ref.doc(user).get();

        if (snap.exists) { await likes.delete(user);  return false; }
        await likes.create(user, {});                 return true;
    }

    async toggleCommentLike(user: string, commentId: string): Promise<boolean> {
        const likes = this.fs('comments').sub(commentId, 'likes');
        const snap  = await (likes as any).ref.doc(user).get();

        if (snap.exists) { await likes.delete(user);  return false; }
        await likes.create(user, {});                 return true;
    }
}
