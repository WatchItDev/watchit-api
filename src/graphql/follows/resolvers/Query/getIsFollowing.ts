import type { QueryResolvers } from './../../../../schema/types'

export const getIsFollowing: NonNullable<QueryResolvers['getIsFollowing']> =
    (_parent, { followerAddress, targetAddress }, { services }) =>
        services.Follows.isFollowing(followerAddress, targetAddress)
