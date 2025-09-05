import { ServiceManager } from './manager';
import type { User, UserInput, UpdateUserInput, Post } from '@/schema/types';
import { AuthData } from '@/types';

export class ProfileService extends ServiceManager {
  /** Create a new user via Cloud Function */
  async createProfile(input: UserInput & AuthData): Promise<User> {
    return this.ds.Users.createUser(input);
  }

  /** Update current user via Cloud Function */
  async updateProfile(
    input: UpdateUserInput & { address: string },
  ): Promise<User> {
    return this.ds.Users.updateUser(input.address, input);
  }

  /** Read operations directly against the datasource */
  getProfile(address: string): Promise<User | null> {
    return this.ds.Users.getUser(address);
  }

  getUsers(query: string, limit?: number): Promise<User[]> {
    return this.ds.Users.getUsers(query, limit);
  }
}
