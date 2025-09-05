import type { QueryResolvers } from '@/schema/types';

export const getTipsForPost: NonNullable<QueryResolvers['getTipsForPost']> = (
  _p,
  { postId, limit },
  { services },
) => services.Tips.getTipsForPost(postId, limit ?? 100) as any;
