import { DataSourceManager } from '../manager';
import type { Post } from '../../schema/types';

export class PostsQuery extends DataSourceManager {
  async getPost(id: string): Promise<Post | null> {
    const p = await this.fs<Post>('posts').get(id);
    return p && !p.hidden ? p : null;
  }

  getPosts = async (q: string, limit = 50): Promise<Post[]> => {
    if (!q) return [];
    return this.fs<Post>('posts').search(q, limit, true);
  };

  async getPostsByAuthor(author: string, limit = 20): Promise<Post[]> {
    return this.fs<Post>('posts').query(
      [
        { field: 'author.address', op: '==', value: author },
        { field: 'hidden', op: '==', value: false },
      ],
      { limit },
    );
  }

  async recentPosts(limit = 20): Promise<Post[]> {
    const dao = this.fs<Post>('posts') as any;
    const snap = await dao.ref
      .where('hidden', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((d: any) => d.data() as Post);
  }

  async popularPosts(limit = 20): Promise<Post[]> {
    const dao = this.fs<Post>('posts') as any;
    const snap = await dao.ref
      .where('hidden', '==', false)
      .orderBy('likeCount', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((d: any) => d.data() as Post);
  }

  async allPosts(): Promise<Post[]> {
    return this.fs<Post>('posts').query(
      [{ field: 'hidden', op: '==', value: false }],
      {},
    );
  }
}
