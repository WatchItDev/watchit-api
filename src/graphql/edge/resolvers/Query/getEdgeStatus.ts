import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { QueryResolvers } from '@/graphql/types';

export const getEdgeStatus: NonNullable<QueryResolvers['getEdgeStatus']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) =>
    services.Edge.getEdgeStatus({ ...input, userId }),
);
