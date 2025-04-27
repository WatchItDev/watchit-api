import { DataSourceManager } from '../manager.js';
import { UserInput, User, UpdateUserInput } from '../../schema/types.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'graphql';

declare class UsersCommands extends DataSourceManager {
    createUser(input: UserInput): Promise<User>;
    updateUser(address: string, patch: Partial<Omit<UpdateUserInput, 'address' | 'createdAt'>>): Promise<User>;
    updateCounterField(address: string, field: keyof Pick<User, 'followersCount' | 'followingCount' | 'publicationsCount' | 'bookmarksCount'>, delta: number): Promise<void>;
}

export { UsersCommands };
