import type { QueryResolvers } from './../../../../schema/types';

export const getUserBookmarks: NonNullable<
  QueryResolvers['getUserBookmarks']
> = (_parent, { address, limit }, { services }) =>
  services.Bookmarks.getBookmarksByUser(address, limit ?? 50);
