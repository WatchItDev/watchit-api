import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/graphql/types';

export const updateComment: NonNullable<MutationResolvers['updateComment']> = withRequireAuth(
  async (_parent, { input }, { services }) => {
    return services.Comment.updateComment(input);
  },
);
