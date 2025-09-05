import type { MutationResolvers } from './../../../../schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const incrementPostView: NonNullable<
  MutationResolvers['incrementPostView']
> = requireAuth(async (_parent, { postId }, { services }) => {
  return services.Posts.incrementView(postId);
});
