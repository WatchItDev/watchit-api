import { ServiceManager } from './manager'
import { toggle }         from '@/helpers/toggle'
import type { User }      from '@/schema/types'

export class FollowService extends ServiceManager {
    toggleFollow = (me: string, target: string) =>
        toggle(
            () => this.ds.Follows.isFollowing(me, target),
            () => this.ds.Follows.addFollow(me, target),
            () => this.ds.Follows.removeFollow(me, target),
        )

    isFollowing = (follower: string, following: string) =>
        this.ds.Follows.isFollowing(follower, following)

    getFollowers = (addr: string, limit = 50): Promise<User[]> =>
        this.ds.Follows.followersOf(addr, limit)

    getFollowing = (addr: string, limit = 50): Promise<User[]> =>
        this.ds.Follows.followingOf(addr, limit)
}
