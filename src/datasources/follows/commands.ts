import { DataSourceManager } from '../manager';

export class FollowsCommands extends DataSourceManager {
  addFollow(follower: string, following: string) {
    return this.fs('follows').create(`${follower}_${following}`, {
      follower,
      following,
      createdAt: Date.now(),
    });
  }

  removeFollow(follower: string, following: string) {
    return this.fs('follows').delete(`${follower}_${following}`);
  }
}
