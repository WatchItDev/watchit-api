import type { MutationResolvers } from './../../../../schema/types'

export const deleteComment: NonNullable<MutationResolvers['deleteComment']> =
    async (_parent, { commentId }, { services }) => {
            await services.Comments.deleteComment(commentId)
            return true
    }
