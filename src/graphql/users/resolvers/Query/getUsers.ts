import type { QueryResolvers } from './../../../../schema/types'

export const getUsers: NonNullable<QueryResolvers['getUsers']> =
    (_parent, { prefix, limit }, { services }) =>
        services.Profile.searchUsers(prefix, limit)
