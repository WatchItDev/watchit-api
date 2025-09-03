import type { QueryResolvers } from "@/schema/types";

export const getBookmarksByPost: NonNullable<
  QueryResolvers["getBookmarksByPost"]
> = (_p, { postId, limit }, { services }) =>
  services.Bookmarks.getBookmarksByPost(postId, limit ?? 50);
