import type { MutationResolvers } from './../../../../schema/types'

export const createComment: NonNullable<MutationResolvers['createComment']> =
    async (_parent, { input }, { services }) => {
            return services.Comments.createComment(input)
    }
