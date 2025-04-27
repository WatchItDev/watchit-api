import type { MutationResolvers } from '../../../../schema/types'

export const likePost: NonNullable<MutationResolvers['likePost']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.likePost(me, postId)
            return true
    }
