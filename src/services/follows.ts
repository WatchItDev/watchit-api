import { ServiceManager } from './manager';
import { toggle } from "@/helpers/toggle";

export class FollowService extends ServiceManager {
    toggleFollow      = (u: string, t: string) =>
        toggle(() => this.ds.Follows.isFollowing(u, t),
            [() => this.ds.Follows.addFollowing(u, t),
                () => this.ds.Follows.addFollower(t, u)],
            [() => this.ds.Follows.removeFollowing(u, t),
                () => this.ds.Follows.removeFollower(t, u)]);


    isFollowing = (follower: string, target: string) =>
        this.ds.Follows.isFollowing(follower, target);
}
