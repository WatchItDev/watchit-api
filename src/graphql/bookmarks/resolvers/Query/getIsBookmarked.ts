import type { QueryResolvers } from './../../../../schema/types'

export const getIsBookmarked: NonNullable<QueryResolvers['getIsBookmarked']> =
    async (_parent, { postId }, { services, reqUser }) => {
        const me = reqUser?.address
        if (!me) throw new Error('Not authenticated')
        return await services.Bookmarks.isBookmarked(postId, me)
    }
