import { ServiceManager } from './manager';

export class SocialService extends ServiceManager {
    toggleFollow      = (me: string, target: string)       =>
        this.ext.Functions().social.toggleFollow({ me, targetAddress: target })
            .then(r => r.data.success);

    togglePostLike    = (me: string, postId: string)       =>
        this.ext.Functions().social.togglePostLike({ me, postId })
            .then(r => r.data.success);

    toggleBookmark    = (me: string, postId: string)       =>
        this.ext.Functions().social.toggleBookmark({ me, postId })
            .then(r => r.data.success);

    toggleCommentLike = (me: string, commentId: string)    =>
        this.ext.Functions().social.toggleCommentLike({ me, commentId })
            .then(r => r.data.success);

    isFollowing = (follower: string, target: string) =>
        this.ds.Social.isFollowing(follower, target);
}
