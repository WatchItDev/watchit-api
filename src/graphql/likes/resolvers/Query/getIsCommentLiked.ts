import type { QueryResolvers } from './../../../../schema/types'

export const getIsCommentLiked: NonNullable<QueryResolvers['getIsCommentLiked']> =
    async (_parent, { commentId }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Likes.isCommentLiked(commentId, me)
    }
