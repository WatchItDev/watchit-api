import type { MutationResolvers } from '../../../../schema/types'

export const unbookmarkPost: NonNullable<MutationResolvers['unbookmarkPost']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.unbookmarkPost(me, postId)
            return true
    }
