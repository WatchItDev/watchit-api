import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '../../../../schema/types';
export const setEdgeStatus: NonNullable<MutationResolvers['setEdgeStatus']> =
  withRequireAuth(async (_parent, { input }, { services, user: { id: userId } }) => {
    return services.Edge.setEdgeStatus({
      ...input,
      userId,
    });
  });
