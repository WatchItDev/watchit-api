import { ServiceManager } from './manager';

export class LikesService extends ServiceManager {
    togglePostLike    = (me: string, postId: string)       =>
        this.ext.Functions().likes.togglePostLike({ me, postId })
            .then(r => r.data.success);

    toggleCommentLike = (me: string, commentId: string)    =>
        this.ext.Functions().likes.toggleCommentLike({ me, commentId })
            .then(r => r.data.success);
}
