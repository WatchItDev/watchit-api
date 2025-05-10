import type { MutationResolvers } from './../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const createPost: NonNullable<MutationResolvers['createPost']> = requireAuth(
    async (_parent, { input }, { services, user }) => {
        return services.Posts.createPost(input, user.address)
    }
)
