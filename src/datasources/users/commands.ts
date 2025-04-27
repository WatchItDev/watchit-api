import { DataSourceManager } from '../manager'
import type {UpdateUserInput, User, UserInput} from '../../schema/types'
import { makeNewUser } from '../../models/user';
import { FieldValue } from 'firebase-admin/firestore';

export class UsersCommands extends DataSourceManager {
    async createUser(input: UserInput): Promise<User> {
        const user = makeNewUser(input);
        await this.fs<User>('users').create(user.address, user)
        return user
    }

    async updateUser(
        address: string,
        patch: Partial<Omit<UpdateUserInput, 'address' | 'createdAt'>>
    ): Promise<User> {
        await this.fs<UpdateUserInput & { updatedAt: number }>('users').update(address, { ...patch, updatedAt: Date.now() })
        return (await this.fs<User>('users').get(address))!
    }

    async updateCounterField(
        address: string,
        field: keyof Pick<User,'followersCount'|'followingCount'|'publicationsCount'|'bookmarksCount'>,
        delta: number
    ): Promise<void> {
        const dao = this.fs<User>('users') as any;
        await dao.ref.doc(address)
            .update({ [field]: FieldValue.increment(delta) });
    }
}
