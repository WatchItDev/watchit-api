import type { MutationResolvers } from './../../../../schema/types'

export const deletePost: NonNullable<MutationResolvers['deletePost']> =
    async (_parent, { postId }, { services }) => {
            await services.Posts.deletePost(postId)
            return true
    }
