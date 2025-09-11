import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const incrementPostView: NonNullable<MutationResolvers['incrementPostView']> = requireAuth(
  async (_parent, { postId }, { services }) => {
    return services.Posts.incrementView(postId);
  },
);
