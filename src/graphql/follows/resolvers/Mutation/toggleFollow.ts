import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '../../../../schema/types';

export const toggleFollow: NonNullable<MutationResolvers['toggleFollow']> = requireAuth(
  async (_parent, { input: { targetAddress } }, { services, user }) => {
    return await services.Follows.toggleFollow(user.address, targetAddress);
  },
);
