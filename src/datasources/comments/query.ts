import { DataSourceManager } from '@/datasources/manager';
import { Comment } from '@/schema/types';

export class CommentsQuery extends DataSourceManager {
    listComments = (postId: string) =>
        this.fs<Comment>(`posts/${postId}/comments`).list(100);
}
