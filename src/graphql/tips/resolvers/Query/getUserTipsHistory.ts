import type { QueryResolvers } from '@/schema/types';

export const getUserTipsHistory: NonNullable<QueryResolvers['getUserTipsHistory']> = (
  _p,
  { address, limit },
  { services },
) => services.Tips.getUserTipsHistory(address, limit ?? 100) as any;
