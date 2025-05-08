import type { MutationResolvers } from './../../../../schema/types'

export const hidePost: NonNullable<MutationResolvers['hidePost']> =
    async (_parent, { postId }, { services }) => {
            await services.Posts.hidePost(postId)
            return true
    }
