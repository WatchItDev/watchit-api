import type { QueryResolvers } from './../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const getIsCommentLiked: NonNullable<QueryResolvers['getIsCommentLiked']> = requireAuth(
    async (_parent, { commentId }, { services, user }) => {
        return await services.Likes.isCommentLiked(commentId, user.address)
    }
)
