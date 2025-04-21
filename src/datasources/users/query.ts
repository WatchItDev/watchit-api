import { DataSourceManager } from '../manager'
import type { User } from '../../schema/types'

export class UsersQuery extends DataSourceManager {
    getUser = (addr: string): Promise<User | null> =>
        this.fs<User>('users').get(addr)

    // TODO instead of prefixSearch, use only search and it searches for the username, visibleName, address and bio
    getUsers = (q: string, limit = 20): Promise<User[]> =>
        q.trim()
            ? this.fs<User>('users').prefixSearch('username', q, limit)
            : Promise.resolve([])
}
