import { ServiceManager } from './manager';
import { User, UserInput } from '@/schema/types';

export class ProfileService extends ServiceManager {
    createProfile = (input: UserInput): Promise<User> =>
        this.ds.Users.createProfile(input);

    getProfile = (address: string) => this.ds.Users.getUser(address);

    updateProfile = (address: string, p) =>
        this.ds.Users.updateProfile(address, p);
}
