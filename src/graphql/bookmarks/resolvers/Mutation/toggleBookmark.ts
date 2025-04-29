import type {MutationResolvers} from '../../../../schema/types'

export const toggleBookmark: NonNullable<MutationResolvers['toggleBookmark']> =
    async (_parent, { input: { postId } }, { services, reqUser }) => {
            const me = reqUser?.address
            if (!me) throw new Error('Not authenticated')
            return await services.Bookmarks.toggleBookmark(me, postId)
    }
