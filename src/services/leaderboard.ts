import { ServiceManager } from "./manager";

export class LeaderboardService extends ServiceManager {
  async topByXp(limit = 100) {
    return this.ds.Users.topByXp(limit);
  }
}
