import type { MutationResolvers } from './../../../../schema/types'

export const updateComment: NonNullable<MutationResolvers['updateComment']> =
    async (_parent, { input }, { services }) => {
            return services.Comments.updateComment(input)
    }
