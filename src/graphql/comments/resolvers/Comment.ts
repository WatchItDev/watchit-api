import type { CommentResolvers } from './../../../schema/types';

export const Comment: CommentResolvers = {
  post: (c, _args, { dataSources }) => {
    return dataSources.Posts.getPostOrThrow({
      id: c.postId,
    });
  },
  parent: (c, _args, { dataSources }) => {
    if (!c.parentId) return null;
    return dataSources.Comments.getCommentOrThrow({
      id: c.parentId,
    });
  },
  base: ({ base }, _arg, _ctx) => {
    /* Comment.base resolver is required because Comment.base and CommentMapper.base are not compatible */
    return base;
  },
};
