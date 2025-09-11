import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const hidePost: NonNullable<MutationResolvers['hidePost']> = requireAuth(
  async (_parent, { postId }, { services }) => {
    await services.Posts.hidePost(postId);
    return true;
  },
);
