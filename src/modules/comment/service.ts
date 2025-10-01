import { Comment, CreateCommentDTO } from '@/modules/comment/types';
import type { Context } from '@/modules/types';

export const CommentService = (ctx: Context) => ({
  /** Create a comment via Cloud Function */
  async createComment(input: CreateCommentDTO): Promise<Comment> {
    const { userId, postId, parentId, body } = input;
    return ctx.ds.Comment.create({
      userId,
      postId,
      body,
      parentId: parentId ?? undefined,
    });
  },

  // /** Update a comment via Cloud Function */
  // async updateComment(input: UpdateCommentInput): Promise<Comment | null> {
  //   return this.ds.Comments.updateComment(input);
  // }

  // /** Hide a comment via Cloud Function */
  // async hideComment(commentId: string): Promise<void> {
  //   return this.ds.Comments.hideComment(commentId);
  // }

  getComment(input: Id): Promise<Comment | null> {
    return ctx.ds.Comment.getComment(input);
  },

  // getCommentsByPost(postId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getCommentsByPost(postId, limit);
  // }

  // getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getRepliesByComment(commentId, limit);
  // }
});
