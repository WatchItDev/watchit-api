import type { MutationResolvers } from './../../../../schema/types'

export const hideComment: NonNullable<MutationResolvers['hideComment']> =
    async (_parent, { commentId }, { services }) => {
            await services.Comments.hideComment(commentId)
            return true
    }
