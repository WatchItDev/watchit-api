import { DataSourceManager } from '../manager';
import type { Comment } from '../../schema/types';

export class CommentsQuery extends DataSourceManager {
    async getComment(id: string): Promise<Comment | null> {
        const c = await this.fs<Comment>('comments').get(id);
        return c && !c.hidden ? c : null;
    }

    async getCommentsByPost(postId: string, limit = 20): Promise<Comment[]> {
        return this.fs<Comment>('comments').query(
            [
                { field: 'postId',          op: '==', value: postId },
                { field: 'parentCommentId', op: '==', value: null },
                { field: 'hidden',          op: '==', value: false },
            ],
            {
                limit,
                orderBy: { field: 'createdAt', direction: 'desc' },
            }
        );
    }

    async getRepliesByComment(commentId: string, limit = 20): Promise<Comment[]> {
        return this.fs<Comment>('comments').query(
            [
                { field: 'parentCommentId', op: '==', value: commentId },
                { field: 'hidden',          op: '==', value: false },
            ],
            {
                limit,
                orderBy: { field: 'createdAt', direction: 'desc' },
            }
        );
    }
}
