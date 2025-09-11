import type { Comment, CreateCommentInput, UpdateCommentInput } from '@/schema/types';
import { ServiceManager } from './manager';

export class CommentService extends ServiceManager {
  /** Create a comment via Cloud Function */
  async createComment(input: CreateCommentInput, address: string): Promise<Comment> {
    return this.ds.Comments.createComment(address, input);
  }

  /** Update a comment via Cloud Function */
  async updateComment(input: UpdateCommentInput): Promise<Comment | null> {
    return this.ds.Comments.updateComment(input);
  }

  // /** Hide a comment via Cloud Function */
  // async hideComment(commentId: string): Promise<void> {
  //   return this.ds.Comments.hideComment(commentId);
  // }

  // /** Read-only fetches */
  // getComment(id: string): Promise<Comment | null> {
  //   return this.ds.Comments.getComment(id);
  // }

  // getCommentsByPost(postId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getCommentsByPost(postId, limit);
  // }

  // getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getRepliesByComment(commentId, limit);
  // }
}
