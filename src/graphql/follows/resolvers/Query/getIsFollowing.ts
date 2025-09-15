import { requireAuth } from '@/graphql/_base/hof/auth';
import type { QueryResolvers } from '../../../../schema/types';

export const getIsFollowing: NonNullable<QueryResolvers['getIsFollowing']> = requireAuth(
  (_parent, { targetAddress }, { services, user }) =>
    services.Follows.isFollowing(user.address, targetAddress),
);
