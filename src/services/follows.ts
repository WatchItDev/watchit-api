import { ServiceManager } from './manager';

export class FollowService extends ServiceManager {
    toggleFollow = (me: string, target: string) => {
        return this.ext.Functions().follows.toggleFollow({ me, targetAddress: target })
            .then(r => r.data.success);
    }


    isFollowing = (follower: string, target: string) =>
        this.ds.Follows.isFollowing(follower, target);
}
