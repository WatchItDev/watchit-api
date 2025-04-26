import { DataSourceManager } from '../manager';
import type { Comment } from '../../schema/types';

export class CommentsQuery extends DataSourceManager {
    getComment(id: string): Promise<Comment | null> {
        return this.fs<Comment>('comments').get(id);
    }

    getCommentsByPost(postId: string, limit = 20): Promise<Comment[]> {
        return this.fs<Comment>('comments')
            .query([{ field: 'postId', op: '==', value: postId }], limit);
    }

    getRepliesByComment(commentId: string, limit = 20): Promise<Comment[]> {
        return this.fs<Comment>('comments')
            .query(
                [{ field: 'parentCommentId', op: '==', value: commentId }],
                limit
            );
    }
}
