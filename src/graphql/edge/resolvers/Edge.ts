import type { EdgeResolvers } from '@/graphql/types';
export const Edge: EdgeResolvers = {
  /* Implement Follow resolver logic here */
  followedAt: ({ updatedAt }, _arg, _ctx) => {
    /* Post.base resolver is required because Post.base and PostMapper.base are not compatible */
    return updatedAt;
  },
  isFollowing: ({ state }, _arg, _ctx) => {
    /* Post.base resolver is required because Post.base and PostMapper.base are not compatible */
    return state === 'FOLLOW';
  },
  isBlocked: ({ state }, _arg, _ctx) => {
    return state === 'BLOCK';
  },
  user: async ({ toUserId }, _arg, { dataSources }) => {
    return dataSources.User.getUserOrThrow({ id: toUserId });
  },
};
