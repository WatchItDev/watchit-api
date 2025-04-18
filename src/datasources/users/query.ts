import { DataSourceManager } from '@/datasources/manager';
import { User } from '@/schema/types';

export class UsersQuery extends DataSourceManager {
    getUser = (addr: string) => {
        return this.fs<User>('users').get(addr)
    };

    getUsers = async (q: string, limit = 20): Promise<User[]> => {
        // TODO if we are going to use this only for username rename otherwise expand the options
        const col = this.fs<User>('users'); // we need raw ref:
        const snap = await (col as any).ref
            .where('username', '>=', q)
            .where('username', '<=', q + '\uf8ff')
            .limit(limit)
            .get();
            
        return snap.docs.map((d) => ({ id: d.id, ...(d.data() as User) }));
    };
}
