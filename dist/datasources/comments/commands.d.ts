import { DataSourceManager } from '../manager.js';
import { CreateCommentInput, Comment, UpdateCommentInput, Post } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class CommentsCommands extends DataSourceManager {
    createComment(authorAddress: string, input: CreateCommentInput): Promise<Comment>;
    updateComment(input: UpdateCommentInput): Promise<Comment | null>;
    deleteComment(commentId: string): Promise<void>;
    updateCounterField(id: string, field: keyof Post, delta: number): Promise<void>;
}

export { CommentsCommands };
