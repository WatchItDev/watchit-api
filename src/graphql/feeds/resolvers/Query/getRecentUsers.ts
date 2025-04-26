import type { QueryResolvers } from './../../../../schema/types'

export const getRecentUsers: NonNullable<QueryResolvers['getRecentUsers']> =
    (_parent, { limit }, { services }) =>
        services.Feeds.recentUsers(limit)
