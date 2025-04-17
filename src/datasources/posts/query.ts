import { DataSourceManager } from '@/datasources/manager';
import { Post } from '@/schema/types';

export class PostsQuery extends DataSourceManager {
    getPost = (id: string) => this.fs<Post>('posts').get(id);

    listNewest = (limit = 20) => this.fs<Post>('posts').list(limit);

    async listPopular(limit = 20): Promise<Post[]> {
        const col = this.fs<Post>('posts') as any;
        const snap = await col.ref
            .orderBy('likeCount', 'desc')
            .orderBy('commentCount', 'desc')
            .limit(limit)
            .get();
        return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Post) }));
    }
}
