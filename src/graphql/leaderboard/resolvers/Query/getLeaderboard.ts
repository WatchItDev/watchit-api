import type { QueryResolvers } from '@/schema/types';

export const getLeaderboard: NonNullable<QueryResolvers['getLeaderboard']> = (
  _p,
  { limit },
  { services },
) => services.Leaderboard.topByXp(limit ?? 100);
