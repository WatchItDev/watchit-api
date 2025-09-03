import type { QueryResolvers } from "@/schema/types";

export const getBookmarksByUser: NonNullable<
  QueryResolvers["getBookmarksByUser"]
> = (_p, { address, limit }, { services }) =>
  services.Bookmarks.getBookmarksByUser(address, limit ?? 50);
