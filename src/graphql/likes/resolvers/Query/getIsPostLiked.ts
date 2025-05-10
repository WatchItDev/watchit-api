import type { QueryResolvers } from './../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const getIsPostLiked: NonNullable<QueryResolvers['getIsPostLiked']> = requireAuth(
    async (_parent, { postId }, { services, user }) => {
        return await services.Likes.isPostLiked(postId, user.address)
    }
)
