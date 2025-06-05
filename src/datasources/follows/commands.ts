import { DataSourceManager } from '../manager';

export class FollowsCommands extends DataSourceManager {
    addFollowing (me: string, target: string) {
        return this.fs('users').sub(me, 'following').create(target, {});
    }
    removeFollowing (me: string, target: string) {
        return this.fs('users').sub(me, 'following').delete(target);
    }
    addFollower (target: string, me: string) {
        return this.fs('users').sub(target, 'followers').create(me, {});
    }
    removeFollower (target: string, me: string) {
        return this.fs('users').sub(target, 'followers').delete(me);
    }
}
