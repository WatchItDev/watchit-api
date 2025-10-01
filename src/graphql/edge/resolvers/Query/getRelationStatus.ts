import { withRequireAuth } from '@/graphql/_base/hof/auth';

import type { QueryResolvers } from '../../../../schema/types';
export const getEdgeStatus: NonNullable<QueryResolvers['getEdgeStatus']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) =>
    services.Edge.getEdgeStatus({ ...input, userId }),
);
