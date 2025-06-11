 import type { QueryResolvers } from './../../../../schema/types'

 export const getUserFollowing: NonNullable<QueryResolvers['getUserFollowing']> =
     (_parent, { address }, { services }) =>
         services.Follows.getFollowing(address)
