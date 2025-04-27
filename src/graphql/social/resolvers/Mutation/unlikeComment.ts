import type { MutationResolvers } from '../../../../schema/types'

export const unlikeComment: NonNullable<MutationResolvers['unlikeComment']> =
    async (_parent, { input: { commentId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.unlikeComment(me, commentId)
            return true
    }
