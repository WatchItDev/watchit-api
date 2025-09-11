import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/schema/types';

export const logEvent: NonNullable<MutationResolvers['logEvent']> = requireAuth(
  async (_p, { input }, { services, user }) => {
    await services.Logs.logEvent(user.address, input);
    return true;
  },
);
