import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const createComment: NonNullable<MutationResolvers['createComment']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) => {
    return services.Comments.createComment({
      ...input,
      userId,
    });
  },
);
