import type { QueryResolvers } from '@/schema/types';

export const getUserXPHistory: NonNullable<QueryResolvers['getUserXPHistory']> =
    (_p, { address, limit, offset }, { services }) =>
        services.XP.getHistory(address, limit ?? 50, offset ?? 0);
