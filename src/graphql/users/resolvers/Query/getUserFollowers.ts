import type { QueryResolvers } from './../../../../schema/types'

export const getUserFollowers: NonNullable<QueryResolvers['getUserFollowers']> =
    (_parent, { address }, { services }) =>
        services.Follows.getFollowers(address)
