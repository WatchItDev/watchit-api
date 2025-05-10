import type { MutationResolvers } from '../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const togglePostLike: NonNullable<MutationResolvers['togglePostLike']> = requireAuth(
    async (_parent, { input: { postId } }, { services, user }) => {
        return await services.Likes.togglePostLike(user.address, postId)
    }
)
