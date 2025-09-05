import type { QueryResolvers } from './../../../../schema/types';

export const getPost: NonNullable<QueryResolvers['getPost']> = (
  _parent,
  { id },
  { services },
) => services.Posts.getPost(id);
