import { DataSourceManager } from '../manager';

export class SocialCommands extends DataSourceManager {
    /* ------------------- FOLLOW ------------------- */
    async followUser(me: string, target: string): Promise<void> {
        console.log('hello follow');
        console.log(me, target);
        await this.fs('users').sub(me,   'following').create(target, {});
        await this.fs('users').sub(target, 'followers').create(me,   {});
    }
    async unfollowUser(me: string, target: string): Promise<void> {
        await this.fs('users').sub(me,   'following').delete(target);
        await this.fs('users').sub(target, 'followers').delete(me);
    }

    /* ------------------- LIKE post ------------------- */
    async likePost(user: string, postId: string) {
        await this.fs('posts').sub(postId, 'likes').create(user, {});
    }
    async unlikePost(user: string, postId: string) {
        await this.fs('posts').sub(postId, 'likes').delete(user);
    }

    /* ------------------- BOOKMARK ------------------- */
    async bookmarkPost(user: string, postId: string) {
        await this.fs('posts').sub(postId, 'bookmarks').create(user, {});
        await this.fs('users').sub(user, 'bookmarks').create(postId, {});
    }
    async unbookmarkPost(user: string, postId: string) {
        await this.fs('posts').sub(postId, 'bookmarks').delete(user);
        await this.fs('users').sub(user, 'bookmarks').delete(postId);
    }

    /* ------------------- LIKE comment -------------- */
    async likeComment(user: string, commentId: string) {
        await this.fs('comments').sub(commentId, 'likes').create(user, {});
    }
    async unlikeComment(user: string, commentId: string) {
        await this.fs('comments').sub(commentId, 'likes').delete(user);
    }
}
