import type { MutationResolvers } from '../../../../schema/types'

export const toggleCommentLike: NonNullable<MutationResolvers['toggleCommentLike']> =
    async (_parent, { input: { commentId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Social.toggleCommentLike(me, commentId)
    }
