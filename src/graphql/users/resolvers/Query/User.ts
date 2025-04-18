import type { QueryResolvers } from './../../../../schema/types';

export const user: NonNullable<QueryResolvers['user']> = (
    _,
    { address },
    ctx
) => ctx.services.Profile.getProfile(address);
