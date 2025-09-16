import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '../../../../schema/types';
export const setRelationStatus: NonNullable<MutationResolvers['setRelationStatus']> = withRequireAuth(
        async (_parent, { input }, { services, user: { id: userId } }) => {
                return services.Relations.setFollowStatus({
                        ...input,
                        userId,
                });
        },
);