import { DataSourceManager } from '@/datasources/manager';
import { Post } from '@/schema/types';
import { increment } from 'firebase-admin/firestore';

export class PostsCommand extends DataSourceManager {
    async createPost(author: string, content: string, media: string[]) {
        const col = this.fs<Post>('posts');
        const id = crypto.randomUUID();
        await col.create(id, {
            authorAddress: author,
            content,
            media,
            likeCount: 0,
            commentCount: 0,
            bookmarkCount: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        } as unknown as Post);

        // bump author's publicationsCount
        await this.fs<any>('users').update(author, {
            publicationsCount: increment(1),
        });

        return id;
    }

    deletePost = (author: string, id: string) =>
        Promise.all([
            this.fs<Post>('posts').delete(id),
            this.fs<any>('users').update(author, {
                publicationsCount: increment(-1),
            }),
        ]);
}
