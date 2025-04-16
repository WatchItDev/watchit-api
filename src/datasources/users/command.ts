import { DataSourceManager } from '@/datasources/manager'
import { User } from '@/schema/types';

export class CommandManager extends DataSourceManager {

    createProfile(user: User) {
        // this.store.getCollection("users")
    }
}