import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const createComment: NonNullable<MutationResolvers['createComment']> = requireAuth(
  async (_parent, { input }, { services, user }) => {
    return services.Comments.createComment({
      ...input,
      userId: user.id,
    });
  },
);
