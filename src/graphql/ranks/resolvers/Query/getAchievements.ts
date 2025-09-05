import { QueryResolvers } from '@/schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const getAchievements: NonNullable<QueryResolvers['getAchievements']> =
  requireAuth((_p, { address }, { services }) =>
    services.Ranks.achievements(address),
  );
