import type { QueryResolvers } from '@/schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const hasPerk: NonNullable<QueryResolvers['hasPerk']> = requireAuth(
  (_p, { address, perkId }, { services }) =>
    services.Perks.hasPerk(address, perkId),
);
