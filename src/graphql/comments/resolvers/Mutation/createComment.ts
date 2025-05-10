import type { MutationResolvers } from './../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const createComment: NonNullable<MutationResolvers['createComment']> = requireAuth(
    async (_parent, { input }, { services, user }) => {
            return services.Comments.createComment(input, user.address)
    }
)
