import type { CommentResolvers } from '@/graphql/types';

export const Comment: CommentResolvers = {
  post: (c, _args, { dataSources }) => {
    return dataSources.Post.getPostOrThrow({
      id: c.postId,
    });
  },
  parent: (c, _args, { dataSources }) => {
    if (!c.parentId) return null;
    return dataSources.Comment.getCommentOrThrow({
      id: c.parentId,
    });
  },
  replies: (c, { page }, { dataSources }) => {
    // TODO fix n+1 query problem
    const limit = page?.limit ?? undefined;
    const offset = page?.offset ?? undefined;

    return dataSources.Comment.getComments(
      {
        parentId: c.id,
      },
      { limit, offset },
    );
  },
  base: ({ base }, _arg, _ctx) => {
    /* Comment.base resolver is required because Comment.base and CommentMapper.base are not compatible */
    return base;
  },
  body: ({ body }, _arg, _ctx) => {
    /* Comment.body resolver is required because Comment.body and CommentMapper.body are not compatible */
    return body;
  },
};
