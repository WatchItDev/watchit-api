import type { MutationResolvers } from '../../../../schema/types'

export const followUser: NonNullable<MutationResolvers['followUser']> =
    async (_parent, { input: { targetAddress } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.followUser(me, targetAddress)
            return true
    }
