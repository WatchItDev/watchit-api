import { ServiceManager } from './manager';
import { UpdateUserInput, User, UserInput } from '@/schema/types';

/**
 * All mutations go through Cloud Functions.
 * Reads come from the datasource (Admin SDK – read‑only).
 */
export class ProfileService extends ServiceManager {
    async createProfile(input: UserInput): Promise<User> {
        const res = await this.ext.Functions().users.create(input);
        return res.data.user;
    }

    async updateProfile(address: string, patch: UpdateUserInput): Promise<User> {
        const res = await this.ext.Functions().users.update({ ...patch });
        return res.data.user;
    }

    getProfile = (addr: string) => this.ds.Users.getUser(addr);
}
