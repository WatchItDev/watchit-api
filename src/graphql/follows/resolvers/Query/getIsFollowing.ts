import type { QueryResolvers } from './../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const getIsFollowing: NonNullable<QueryResolvers['getIsFollowing']> = requireAuth(
    (_parent, { targetAddress }, { services, user }) =>
        services.Follows.isFollowing(user.address, targetAddress)
)