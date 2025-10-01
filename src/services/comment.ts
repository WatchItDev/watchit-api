import { CommentContent, ContentKind } from '@/externals/prisma';
import type {
  CommentByIdentifierInput,
  CreateCommentInput,
  UpdateCommentInput,
} from '@/graphql/types';
import type { UserId, Id } from '@/types';
import { ServiceManager } from './manager';

export type CreateCommentDTO = CreateCommentInput & UserId;
export type UpdateCommentDTO = UpdateCommentInput & Id;

export class CommentService extends ServiceManager {
  /** Create a comment via Cloud Function */
  async createComment(input: CreateCommentDTO): Promise<CommentContent> {
    const { userId, postId, parentId, ...comment } = input;
    const base = { userId, kind: ContentKind.COMMENT };
    const post = { id: postId }; // parent post
    const parentComment = parentId ? { id: parentId } : undefined;
    return this.ds.Comment.create({ ...comment, base, post, parentComment });
  }

  // /** Update a comment via Cloud Function */
  // async updateComment(input: UpdateCommentInput): Promise<Comment | null> {
  //   return this.ds.Comments.updateComment(input);
  // }

  // /** Hide a comment via Cloud Function */
  // async hideComment(commentId: string): Promise<void> {
  //   return this.ds.Comments.hideComment(commentId);
  // }

  getComment(input: CommentByIdentifierInput): Promise<CommentContent | null> {
    return this.ds.Comment.getComment(input);
  }

  // getCommentsByPost(postId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getCommentsByPost(postId, limit);
  // }

  // getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]> {
  //   return this.ds.Comments.getRepliesByComment(commentId, limit);
  // }
}
