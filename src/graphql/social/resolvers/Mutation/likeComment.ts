import type { MutationResolvers } from '../../../../schema/types'

export const likeComment: NonNullable<MutationResolvers['likeComment']> =
    async (_parent, { input: { commentId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.likeComment(me, commentId)
            return true
    }
