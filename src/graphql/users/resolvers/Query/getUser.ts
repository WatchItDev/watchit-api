import type { QueryResolvers } from './../../../../schema/types'

export const getUser: NonNullable<QueryResolvers['getUser']> =
    (_parent, { address }, { services }) =>
        services.Profile.getProfile(address)
