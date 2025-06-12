import type { QueryResolvers } from '@/schema/types'

export const getUserEvents: NonNullable<QueryResolvers['getUserEvents']> =
    (_p, { address, type, limit, offset }, { services }) =>
        services.Logs.userEvents(address, type, limit, offset)