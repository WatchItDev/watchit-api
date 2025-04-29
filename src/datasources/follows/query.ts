import { DataSourceManager } from '../manager';
import type { User } from '../../schema/types';

export class FollowsQuery extends DataSourceManager {
    async isFollowing(follower: string, target: string): Promise<boolean> {
        return this
            .fs<User>('users')
            .sub(follower, 'following')
            .exists(target);
    }
}
