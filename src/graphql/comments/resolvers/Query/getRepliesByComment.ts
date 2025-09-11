import type { QueryResolvers } from './../../../../schema/types';

export const getRepliesByComment: NonNullable<QueryResolvers['getRepliesByComment']> = async (
  _parent,
  { commentId, limit },
  { services },
) => {
  return services.Comments.getRepliesByComment(commentId, limit);
};
