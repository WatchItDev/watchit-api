import type { QueryResolvers } from './../../../../schema/types'

export const getIsPostLiked: NonNullable<QueryResolvers['getIsPostLiked']> =
    async (_parent, { postId }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Likes.isPostLiked(postId, me)
    }
