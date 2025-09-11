import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const hideComment: NonNullable<MutationResolvers['hideComment']> = requireAuth(
  async (_parent, { commentId }, { services }) => {
    await services.Comments.hideComment(commentId);
    return true;
  },
);
