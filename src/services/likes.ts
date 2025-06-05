import { ServiceManager } from './manager';

export class LikesService extends ServiceManager {
    togglePostLike = async (me: string, postId: string) =>
        this.ds.Likes.togglePostLike(me, postId);

    toggleCommentLike = (me: string, commentId: string) =>
        this.ds.Likes.toggleCommentLike(me, commentId);

    isPostLiked = (postId: string, me: string) =>
        this.ds.Likes.isPostLiked(postId, me);

    isCommentLiked = (commentId: string, me: string) =>
        this.ds.Likes.isCommentLiked(commentId, me);
}
