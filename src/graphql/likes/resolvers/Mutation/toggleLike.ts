import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/schema/types';

export const toggleLike: NonNullable<MutationResolvers['toggleLike']> = requireAuth(
  async (_p, { input: { targetId, targetType } }, { services, user }) =>
    services.Likes.toggleLike(user.address, targetId, targetType),
);
