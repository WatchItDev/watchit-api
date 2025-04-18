import { DataSourceManager } from '../manager'
import type { User, UserInput } from '../../schema/types'
import { makeNewUser } from "../../models/user";

export class UsersCommands extends DataSourceManager {
    /**
     * Create & return the User object in one shot.
     */
    async createUser(input: UserInput): Promise<User> {
        const user = makeNewUser(input);
        await this.fs<User>('users').create(user.address, user)
        return user
    }

    /**
     * Update & return the patched User.
     */
    async updateUser(
        address: string,
        patch: Partial<Omit<User, 'address' | 'createdAt'>>
    ): Promise<User> {
        await this.fs<User>('users').update(address, { ...patch, updatedAt: Date.now() })
        // read back for return
        return (await this.fs<User>('users').get(address))!
    }
}
