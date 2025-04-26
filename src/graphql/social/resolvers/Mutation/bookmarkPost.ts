import type { MutationResolvers } from '../../../../schema/types'

export const bookmarkPost: NonNullable<MutationResolvers['bookmarkPost']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.bookmarkPost(me, postId)
            return true
    }
