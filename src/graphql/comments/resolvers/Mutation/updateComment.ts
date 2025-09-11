import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const updateComment: NonNullable<MutationResolvers['updateComment']> = requireAuth(
  async (_parent, { input }, { services }) => {
    return services.Comments.updateComment(input);
  },
);
