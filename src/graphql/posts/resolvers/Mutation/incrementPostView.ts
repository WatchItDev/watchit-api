import type { MutationResolvers } from './../../../../schema/types'

export const incrementPostView: NonNullable<MutationResolvers['incrementPostView']> =
    async (_parent, { postId }, { services }) => {
            return services.Posts.incrementView(postId)
    }
