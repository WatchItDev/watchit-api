import type { MutationResolvers } from '../../../../schema/types'

export const unfollowUser: NonNullable<MutationResolvers['unfollowUser']> =
    async (_parent, { input: { targetAddress } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            await services.Social.unfollowUser(me, targetAddress)
            return true
    }
