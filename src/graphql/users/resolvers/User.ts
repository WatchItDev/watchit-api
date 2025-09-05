import type { UserResolvers, User as UserType } from '@/schema/types';

export const User: UserResolvers = {
  followersCount: (parent: UserType) => parent.followersCount ?? 0,
  followingCount: (parent: UserType) => parent.followingCount ?? 0,
  publicationsCount: (parent: UserType) => parent.publicationsCount ?? 0,
  bookmarksCount: (parent: UserType) => parent.bookmarksCount ?? 0,
};
