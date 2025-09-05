import { QueryResolvers } from '@/schema/types';

export const getRanksCatalog: NonNullable<QueryResolvers['getRanksCatalog']> = (
  _p,
  _a,
  { services },
) => services.Ranks.catalog();
