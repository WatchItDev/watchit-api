import { MutationResolvers } from '@/schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const createPerk: NonNullable<MutationResolvers['createPerk']> =
  requireAuth((_p, { input }, { services }) =>
    services.Perks.createPerk(input),
  );
