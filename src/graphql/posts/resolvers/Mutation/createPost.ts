import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const createPost: NonNullable<MutationResolvers['createPost']> = withRequireAuth(
  async (_parent, { input }, { services, user: { id: userId } }) => {
    return services.Posts.createPost({
      ...input,
      userId,
    });
  },
);
