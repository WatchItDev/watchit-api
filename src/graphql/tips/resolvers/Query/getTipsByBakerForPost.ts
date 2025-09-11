import type { QueryResolvers } from '@/schema/types';

export const getTipsByBakerForPost: NonNullable<QueryResolvers['getTipsByBakerForPost']> = async (
  _p,
  { postId, limit },
  { services },
) => services.Tips.getTipsByBakerForPost(postId, limit ?? 50) as any;
