import type { QueryResolvers } from './../../../../schema/types'

export const getUserBookmarks: NonNullable<QueryResolvers['getUserBookmarks']> =
    (_parent, { address }, { services }) =>
        services.Profile.getBookmarks(address)
