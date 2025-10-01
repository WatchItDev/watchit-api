import type { PostResolvers } from '@/graphql/types';
export const Post: PostResolvers = {
  base: ({ base }, _arg, _ctx) => {
    /* Post.base resolver is required because Post.base and PostMapper.base are not compatible */
    return base;
  },
  comments: (c, { page }, { dataSources }) => {
    return dataSources.Comment.getComments({ postId: c.id }, page ?? undefined);
  },
  body: ({ body }, _arg, _ctx) => {
    /* Post.body resolver is required because Post.body and PostMapper.body are not compatible */
    return body;
  },
  id: ({ id }, _arg, _ctx) => {
    /* Post.id resolver is required because Post.id and PostMapper.id are not compatible */
    return id;
  },
  title: ({ title }, _arg, _ctx) => {
    /* Post.title resolver is required because Post.title and PostMapper.title are not compatible */
    return title;
  },
};
