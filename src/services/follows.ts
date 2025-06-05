import { ServiceManager } from './manager';

export class FollowService extends ServiceManager {
    toggleFollow = (me: string, target: string) => {
        return this.ds.Follows.toggleFollow(me, target);
    }


    isFollowing = (follower: string, target: string) =>
        this.ds.Follows.isFollowing(follower, target);
}
