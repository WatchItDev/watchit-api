import type { QueryResolvers } from '@/schema/types'
import { requireAuth }         from '@/graphql/hof/auth'

export const getIsBookmarked: NonNullable<QueryResolvers['getIsBookmarked']> = requireAuth(
    (_p, { postId }, { services, user }) =>
        services.Bookmarks.isBookmarked(user.address, postId)
)
