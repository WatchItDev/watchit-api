import type { PostResolvers } from './../../../schema/types';
export const Post: PostResolvers = {
  base: ({ base }, _arg, _ctx) => {
    /* Post.base resolver is required because Post.base and PostMapper.base are not compatible */
    return base;
  },
};
