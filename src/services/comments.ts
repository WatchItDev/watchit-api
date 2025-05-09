import { ServiceManager } from './manager';
import type {
    Comment,
    CreateCommentInput,
    UpdateCommentInput
} from '@/schema/types';

export class CommentService extends ServiceManager {
    /** Create a comment via Cloud Function */
    async createComment(
        input: CreateCommentInput
    ): Promise<Comment> {
        const res = await this.ext
            .Functions()
            .comments.create(input);
        return res.data.comment;
    }

    /** Update a comment via Cloud Function */
    async updateComment(input: UpdateCommentInput): Promise<Comment | null> {
        const res = await this.ext
            .Functions()
            .comments.update(input);
        return res.data.comment;
    }

    /** Hide a comment via Cloud Function */
    async hideComment(commentId: string): Promise<boolean> {
        const res = await this.ext
            .Functions()
            .comments.hide({ commentId });
        return res.data.success;
    }

    /** Read-only fetches */
    getComment(id: string): Promise<Comment | null> {
        return this.ds.Comments.getComment(id);
    }

    getCommentsByPost(postId: string, limit?: number): Promise<Comment[]> {
        return this.ds.Comments.getCommentsByPost(postId, limit);
    }

    getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]> {
        return this.ds.Comments.getRepliesByComment(commentId, limit);
    }
}
