import type { QueryResolvers } from '@/graphql/types';
export const getComment: NonNullable<QueryResolvers['getComment']> = async (
  _parent,
  { input },
  { services },
) => services.Comment.getComment(input);
