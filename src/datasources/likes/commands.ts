import { DataSourceManager } from '../manager';

export class LikesCommands extends DataSourceManager {
    addPostLike(userId: string, postId: string) {
        return this.fs('posts').sub(postId, 'likes').create(userId, {});
    }
    removePostLike(userId: string, postId: string) {
        return this.fs('posts').sub(postId, 'likes').delete(userId);
    }
    addCommentLike(userId: string, commentId: string) {
        return this.fs('comments').sub(commentId, 'likes').create(userId, {});
    }
    removeCommentLike(userId: string, commentId: string) {
        return this.fs('comments').sub(commentId, 'likes').delete(userId);
    }
}
