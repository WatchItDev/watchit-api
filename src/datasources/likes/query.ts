import { DataSourceManager } from '../manager';
import type { Post } from "../../schema/types";

export class LikesQuery extends DataSourceManager {
    async isPostLiked(postId: string, me: string): Promise<boolean> {
        return this
            .fs<Post>('posts')
            .sub(postId, 'likes')
            .exists(me);
    }

    async isCommentLiked(commentId: string, me: string): Promise<boolean> {
        return this
            .fs<Comment>('comments')
            .sub(commentId, 'likes')
            .exists(me);
    }
}
