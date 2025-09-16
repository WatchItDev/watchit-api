import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const updateComment: NonNullable<MutationResolvers['updateComment']> = withRequireAuth(
  async (_parent, { input }, { services }) => {
    return services.Comments.updateComment(input);
  },
);
