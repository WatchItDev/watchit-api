import type { MutationResolvers } from '../../../../schema/types'

export const toggleFollow: NonNullable<MutationResolvers['toggleFollow']> =
    async (_parent, { input: { targetAddress } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Follows.toggleFollow(me, targetAddress)
    }
