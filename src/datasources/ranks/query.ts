import { DataSourceManager } from '../manager';
import { Rank, UserRank } from '../../schema/types';

export class RanksQuery extends DataSourceManager {
  getRank = (id: string) => this.fs<Rank>('ranks').get(id);

  async catalog(): Promise<Rank[]> {
    return this.fs<Rank>('ranks').list(100);
  }

  async evaluate(totalXp: number) {
    const ranks = await this.catalog();
    ranks.sort((a, b) => a.minXp - b.minXp);
    const current = ranks.filter((r) => r.minXp <= totalXp).pop()!;
    const next = ranks.find((r) => r.minXp > current.minXp) ?? null;

    return { current, next };
  }

  userRanks = (user: string) =>
    this.fs<UserRank>('userRanks').query(
      [{ field: 'user', op: '==', value: user }],
      { orderBy: { field: 'achievedAt', direction: 'asc' }, limit: 100 },
    );
}
