import type { QueryResolvers } from './../../../../schema/types';

export const getPosts: NonNullable<QueryResolvers['getPosts']> = (
  _parent,
  { query, limit },
  { services },
) => services.Posts.getPosts(query, limit);
