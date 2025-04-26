import { ServiceManager } from './manager';
import type { User, Post, Comment } from '@/schema/types';

export class SocialService extends ServiceManager {
    /** Follow / Unfollow via Cloud Function */
    async followUser(me: string, target: string): Promise<User> {
        const res = await this.ext
            .Functions()
            .social.follow({ me, target });
        return res.data.user;
    }
    async unfollowUser(me: string, target: string): Promise<User> {
        const res = await this.ext
            .Functions()
            .social.unfollow({ me, target });
        return res.data.user;
    }

    /** Like / Unlike Posts via Cloud Function */
    async likePost(me: string, postId: string): Promise<Post> {
        const res = await this.ext
            .Functions()
            .social.likePost({ me, postId });
        return res.data.post;
    }
    async unlikePost(me: string, postId: string): Promise<Post> {
        const res = await this.ext
            .Functions()
            .social.unlikePost({ me, postId });
        return res.data.post;
    }

    /** Bookmark / Unbookmark via Cloud Function */
    async bookmarkPost(me: string, postId: string): Promise<Post> {
        const res = await this.ext
            .Functions()
            .social.bookmarkPost({ me, postId });
        return res.data.post;
    }
    async unbookmarkPost(me: string, postId: string): Promise<Post> {
        const res = await this.ext
            .Functions()
            .social.unbookmarkPost({ me, postId });
        return res.data.post;
    }

    /** Like / Unlike Comments */
    async likeComment(me: string, commentId: string): Promise<Comment> {
        const res = await this.ext
            .Functions()
            .social.likeComment({ me, commentId });
        return res.data.comment;
    }
    async unlikeComment(me: string, commentId: string): Promise<Comment> {
        const res = await this.ext
            .Functions()
            .social.unlikeComment({ me, commentId });
        return res.data.comment;
    }

    isFollowing(followerAddress: string, targetAddress: string): Promise<Boolean> {
        return this.ds.Social.isFollowing(followerAddress, targetAddress);
    }
}
