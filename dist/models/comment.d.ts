import { Comment, CreateCommentInput } from '../schema/types.js';
import 'graphql';

declare function defaultCommentData(): Omit<Comment, 'id' | 'author' | 'post' | 'parentComment' | 'content' | 'createdAt' | 'updatedAt'>;
declare function makeNewComment(id: string, authorAddress: string, input: CreateCommentInput): Comment;

export { defaultCommentData, makeNewComment };
