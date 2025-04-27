import { DataSourceManager } from '../manager.js';
import { Comment } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class CommentsQuery extends DataSourceManager {
    getComment(id: string): Promise<Comment | null>;
    getCommentsByPost(postId: string, limit?: number): Promise<Comment[]>;
    getRepliesByComment(commentId: string, limit?: number): Promise<Comment[]>;
}

export { CommentsQuery };
