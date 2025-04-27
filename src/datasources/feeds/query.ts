import { DataSourceManager } from '../manager';
import type { User, Post }   from '../../schema/types';

export class FeedsQuery extends DataSourceManager {
    async popularUsers(limit = 20): Promise<User[]> {
        const all = await this.fs<User>('users').list(limit);
        return all.sort((a, b) => b.followersCount - a.followersCount).slice(0, limit);
    }

    async recentUsers(limit = 20): Promise<User[]> {
        const all = await this.fs<User>('users').list(limit)
        return all.sort((a, b) => Number(b.createdAt ?? 0) - Number(a.createdAt ?? 0)).slice(0, limit)
    }

    async activeUsers(limit = 20): Promise<User[]> {
        const all = await this.fs<User>('users').list(limit);
        return all
            .sort(
                (a, b) =>
                    (b.publicationsCount + b.followersCount) -
                    (a.publicationsCount + a.followersCount)
            )
            .slice(0, limit);
    }

    async popularPosts(limit = 20): Promise<Post[]> {
        const all = await this.fs<Post>('posts').list(limit);
        return all
            .sort((a, b) => b.likeCount + b.commentCount - (a.likeCount + a.commentCount))
            .slice(0, limit);
    }

    async recentPosts(limit = 20): Promise<Post[]> {
        return this.fs<Post>('posts')
            .query([], limit);
    }

    async allPosts(limit = 100): Promise<Post[]> {
        return this.fs<Post>('posts').list(limit);
    }
}
