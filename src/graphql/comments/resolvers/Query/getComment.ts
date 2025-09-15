import type { QueryResolvers } from './../../../../schema/types';
export const getComment: NonNullable<QueryResolvers['getComment']> = async (
  _parent,
  { input },
  { services },
) => services.Comments.getComment(input);
