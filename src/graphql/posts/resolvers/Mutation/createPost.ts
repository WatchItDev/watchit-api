import type { MutationResolvers } from './../../../../schema/types'

export const createPost: NonNullable<MutationResolvers['createPost']> =
    async (_parent, { input }, { services }) => {
            return services.Posts.createPost(input)
    }
