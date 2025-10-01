import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/graphql/types';

export const createComment: NonNullable<MutationResolvers['createComment']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) => {
    return services.Comment.createComment({
      ...input,
      userId,
    });
  },
);
