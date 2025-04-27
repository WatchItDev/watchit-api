import { DataSourceManager } from '../manager'
import type {Post, User} from '../../schema/types'

export class UsersQuery extends DataSourceManager {
    getUser = async (addr: string): Promise<User | null> =>
        this.fs<User>('users').get(addr)

    // TODO instead of prefixSearch, use only search and it searches for the username, visibleName, address and bio
    getUsers = async (q: string, limit = 50): Promise<User[]> =>
        q.trim()
            ? this.fs<User>('users').prefixSearch('username', q, limit)
            : Promise.resolve([])

    async getFollowers(address: string, limit = 50): Promise<User[]> {
        const ids = await this.fs('users').sub(address, 'followers').ids(limit);
        return Promise.all(ids.map(id => this.getUser(id))).then(u => u.filter(Boolean) as User[]);
    }

    async getFollowing(address: string, limit = 50): Promise<User[]> {
        const ids = await this.fs('users').sub(address, 'following').ids(limit);
        return Promise.all(ids.map(id => this.getUser(id))).then(u => u.filter(Boolean) as User[]);
    }

    async getPublications(address: string, limit = 20): Promise<Post[]> {
        return this.fs<Post>('publications')
            .query([{ field: 'authorAddress', op: '==', value: address }], limit);
    }

    async getBookmarks(address: string, limit = 50): Promise<Post[]> {
        const ids = await this.fs('users').sub(address, 'bookmarks').ids(limit);
        if (!ids.length) return [];
        const posts = await Promise.all(ids.map(id => this.fs<Post>('posts').get(id)));
        return posts.filter(Boolean) as Post[];
    }
}
