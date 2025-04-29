import type { MutationResolvers } from '../../../../schema/types'

export const togglePostLike: NonNullable<MutationResolvers['togglePostLike']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Likes.togglePostLike(me, postId)
    }
