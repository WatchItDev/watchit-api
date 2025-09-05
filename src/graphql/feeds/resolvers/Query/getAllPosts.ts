import type { QueryResolvers } from './../../../../schema/types';

export const getAllPosts: NonNullable<QueryResolvers['getAllPosts']> = (
  _parent,
  { limit },
  { services },
) => {
  return services.Feeds.allPosts(limit);
};
