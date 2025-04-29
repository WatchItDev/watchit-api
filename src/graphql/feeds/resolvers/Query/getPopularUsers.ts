import type { QueryResolvers } from './../../../../schema/types'

export const getPopularUsers: NonNullable<QueryResolvers['getPopularUsers']> =
    (_parent, { limit }, { services }) =>
        services.Feeds.popularUsers(limit)
