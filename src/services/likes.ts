import { ServiceManager } from './manager';
import { toggle } from "@/helpers/toggle";

export class LikesService extends ServiceManager {
    togglePostLike = (u: string, p: string) =>
        toggle(() => this.ds.Likes.isPostLiked(p, u),
            () => this.ds.Likes.addPostLike(u, p),
            () => this.ds.Likes.removePostLike(u, p));

    toggleCommentLike = (u: string, c: string) =>
        toggle(() => this.ds.Likes.isCommentLiked(c, u),
            () => this.ds.Likes.addCommentLike(u, c),
            () => this.ds.Likes.removeCommentLike(u, c));

    isPostLiked = (postId: string, me: string) =>
        this.ds.Likes.isPostLiked(postId, me);

    isCommentLiked = (commentId: string, me: string) =>
        this.ds.Likes.isCommentLiked(commentId, me);
}
