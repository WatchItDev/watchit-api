import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const updatePost: NonNullable<MutationResolvers['updatePost']> = requireAuth(
  async (_parent, { input }, { services }) => {
    return services.Posts.updatePost(input);
  },
);
