import { DataSourceManager } from '@/datasources/manager';
import { User } from '@/schema/types';

export class UsersQuery extends DataSourceManager {
    getUser = (addr: string) => this.fs<User>('users').get(addr);

    searchUsers = async (q: string, limit = 20): Promise<User[]> => {
        const col = this.fs<User>('users'); // we need raw ref:
        const snap = await (col as any).ref
            .where('username', '>=', q)
            .where('username', '<=', q + '\uf8ff')
            .limit(limit)
            .get();
        return snap.docs.map((d) => ({ id: d.id, ...(d.data() as User) }));
    };
}
