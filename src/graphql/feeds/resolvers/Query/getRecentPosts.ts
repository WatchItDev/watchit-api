import type { QueryResolvers } from "./../../../../schema/types";

export const getRecentPosts: NonNullable<QueryResolvers["getRecentPosts"]> = (
  _parent,
  { limit },
  { services },
) => services.Feeds.recentPosts(limit);
