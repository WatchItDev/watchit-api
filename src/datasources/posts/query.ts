import { DataSourceManager } from '../manager';
import type { Post } from '../../schema/types';

export class PostsQuery extends DataSourceManager {
    async getPost(id: string): Promise<Post | null> {
        return this.fs<Post>('posts').get(id);
    }

    async getPostsByAuthor(author: string, limit = 20): Promise<Post[]> {
        return this.fs<Post>('posts')
            .query([{ field: 'author.address', op: '==', value: author }], limit);
    }

    async recentPosts(limit = 20): Promise<Post[]> {
        const dao = this.fs<Post>('posts') as any;
        const snap = await dao.ref
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();
        return snap.docs.map((d: any) => d.data() as Post);
    }

    async popularPosts(limit = 20): Promise<Post[]> {
        const dao = this.fs<Post>('posts') as any;
        const snap = await dao.ref
            .orderBy('likeCount', 'desc')
            .limit(limit)
            .get();
        return snap.docs.map((d: any) => d.data() as Post);
    }

    async allPosts(): Promise<Post[]> {
        return this.fs<Post>('posts').list();
    }
}
