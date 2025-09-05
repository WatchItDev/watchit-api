import type { MutationResolvers } from './../../../../schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const hidePost: NonNullable<MutationResolvers['hidePost']> = requireAuth(
  async (_parent, { postId }, { services }) => {
    await services.Posts.hidePost(postId);
    return true;
  },
);
