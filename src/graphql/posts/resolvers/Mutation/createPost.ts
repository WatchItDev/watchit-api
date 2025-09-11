import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const createPost: NonNullable<MutationResolvers['createPost']> = requireAuth(
  async (_parent, { input }, { services, user }) => {
    return services.Posts.createPost({
      userId: user.id,
      ...input,
    });
  },
);
