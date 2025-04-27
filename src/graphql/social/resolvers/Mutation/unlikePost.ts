import type { MutationResolvers } from '../../../../schema/types'

export const unlikePost: NonNullable<MutationResolvers['unlikePost']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.unlikePost(me, postId)
            return true
    }
