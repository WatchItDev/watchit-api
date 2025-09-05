import type { MutationResolvers } from '@/schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const toggleBookmark: NonNullable<MutationResolvers['toggleBookmark']> =
  requireAuth((_p, { input: { postId } }, { services, user }) =>
    services.Bookmarks.toggleBookmark(user.address, postId),
  );
