import { DataSourceManager } from '@/datasources/manager';
import { User, UserInput } from '@/schema/types';

export class UsersCommand extends DataSourceManager {
    async createProfile(input: UserInput): Promise<User> {
        const col = this.fs<User>('users');
        await col.create(input.address, {
            username: input.username,
            displayName: '',
            bio: '',
            avatarUrl: '',
            verified: false,
            followersCount: 0,
            followingCount: 0,
            publicationsCount: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        } as unknown as User);
        return (await col.get(input.address)) as User;
    }

    updateProfile = (addr: string, partial) =>
        this.fs<User>('users').update(addr, {
            ...partial,
            updatedAt: Date.now(),
        });
}
