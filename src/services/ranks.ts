import { ServiceManager } from './manager';
import { makeRank } from '../models/rank';
import { RankInput } from '../schema/types';

export class RanksService extends ServiceManager {
  catalog = () => this.ds.Ranks.catalog();
  getRank = (id: string) => this.ds.Ranks.getRank(id);
  evaluate = (xpTotal: number) => this.ds.Ranks.evaluate(xpTotal);
  userRanks = (addr: string) => this.ds.Ranks.userRanks(addr);

  async achievements(address: string) {
    const user = await this.ds.Users.getUser(address);
    if (!user) return null;

    const { current, next } = await this.ds.Ranks.evaluate(user.xpTotal);
    const remaining = next ? next.minXp - user.xpTotal : 0;
    const pct = next
      ? ((user.xpTotal - current.minXp) / (next.minXp - current.minXp)) * 100
      : 100;

    return {
      currentRank: current,
      nextRank: next,
      xpBalance: user.xpBalance,
      xpTotal: user.xpTotal,
      progressPct: pct,
      xpRemaining: remaining,
    };
  }

  createRank = (input: RankInput) => this.ds.Ranks.createRank(makeRank(input));
  updateRank = (id: string, p: Partial<RankInput>) =>
    this.ds.Ranks.updateRank(id, p);
  deleteRank = (id: string) => this.ds.Ranks.deleteRank(id);
}
