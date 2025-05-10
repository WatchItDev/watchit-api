import type { MutationResolvers } from '../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const toggleCommentLike: NonNullable<MutationResolvers['toggleCommentLike']> = requireAuth(
    async (_parent, { input: { commentId } }, { services, user }) => {
            return await services.Likes.toggleCommentLike(user.address, commentId)
    }
)
