import { DataSourceManager } from '@/datasources/manager';
import { Comment } from '@/schema/types';
import { increment } from 'firebase-admin/firestore';

export class CommentsCommand extends DataSourceManager {
    async addComment(
        postId: string,
        author: string,
        content: string,
        parent: string | null = null
    ) {
        const col = this.fs<Comment>(`posts/${postId}/comments`);
        const id = crypto.randomUUID();
        await col.create(id, {
            publicationId: postId,
            authorAddress: author,
            parentCommentId: parent,
            content,
            likeCount: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        } as unknown as Comment);

        await this.fs<any>('posts').update(postId, { commentCount: increment(1) });
        return id;
    }
}
