import type { QueryResolvers } from './../../../../schema/types';

export const getCommentsByPost: NonNullable<QueryResolvers['getCommentsByPost']> = async (
  _parent,
  { postId, limit },
  { services },
) => {
  return services.Comments.getCommentsByPost(postId, limit);
};
