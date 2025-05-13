import { ServiceManager } from './manager';
import type {
    User,
    UserInput,
    UpdateUserInput,
    Post
} from '@/schema/types';
import { AuthData } from "@/types";

export class ProfileService extends ServiceManager {
    /** Create a new user via Cloud Function */
    async createProfile(input: UserInput & AuthData): Promise<User> {
        const res = await this.ext.Functions().users.create(input);
        return res.data.user;
    }

    /** Update current user via Cloud Function */
    async updateProfile(input: UpdateUserInput & { address: string; }): Promise<User> {
        const res = await this.ext.Functions().users.update(input);
        return res.data.user;
    }

    /** Read operations directly against the datasource */
    getProfile(address: string): Promise<User | null> {
        return this.ds.Users.getUser(address);
    }

    getUsers(query: string, limit?: number): Promise<User[]> {
        return this.ds.Users.getUsers(query, limit);
    }

    getFollowers(address: string): Promise<User[]> {
        return this.ds.Users.getFollowers(address);
    }

    getFollowing(address: string): Promise<User[]> {
        return this.ds.Users.getFollowing(address);
    }

    getPublications(address: string, limit?: number): Promise<Post[]> {
        return this.ds.Users.getPublications(address, limit);
    }

    getBookmarks(address: string): Promise<Post[]> {
        return this.ds.Users.getBookmarks(address);
    }
}
