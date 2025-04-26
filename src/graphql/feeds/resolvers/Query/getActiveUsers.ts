import type { QueryResolvers } from './../../../../schema/types'

export const getActiveUsers: NonNullable<QueryResolvers['getActiveUsers']> =
    (_parent, { limit }, { services }) => {
            return services.Feeds.activeUsers(limit)
    }
