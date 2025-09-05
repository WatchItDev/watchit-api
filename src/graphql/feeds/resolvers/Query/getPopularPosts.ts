import type { QueryResolvers } from './../../../../schema/types';

export const getPopularPosts: NonNullable<QueryResolvers['getPopularPosts']> = (
  _parent,
  { limit },
  { services },
) => services.Feeds.popularPosts(limit);
