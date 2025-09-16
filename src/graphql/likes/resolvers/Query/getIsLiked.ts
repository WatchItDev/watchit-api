import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { QueryResolvers } from '@/schema/types';

export const getIsLiked: NonNullable<QueryResolvers['getIsLiked']> = withRequireAuth(
  (_p, { targetId }, { services, user }) => services.Likes.isLiked(user.address, targetId),
);
