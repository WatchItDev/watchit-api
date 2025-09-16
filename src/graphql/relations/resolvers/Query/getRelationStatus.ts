import { withRequireAuth } from '@/graphql/_base/hof/auth';

import type { QueryResolvers } from '../../../../schema/types';
export const getRelationStatus: NonNullable<QueryResolvers['getRelationStatus']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) =>
    services.Relations.getFollowStatus({ ...input, userId }),
);
