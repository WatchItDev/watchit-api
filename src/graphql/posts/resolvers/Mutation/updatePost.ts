import type { MutationResolvers } from './../../../../schema/types'

export const updatePost: NonNullable<MutationResolvers['updatePost']> =
    async (_parent, { input }, { services }) => {
            return services.Posts.updatePost(input)
    }
