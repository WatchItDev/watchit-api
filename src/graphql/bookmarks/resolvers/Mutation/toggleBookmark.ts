import type {MutationResolvers} from '../../../../schema/types'
import {requireAuth} from "@/graphql/hof/auth";

export const toggleBookmark: NonNullable<MutationResolvers['toggleBookmark']> = requireAuth(
    async (_parent, { input: { postId } }, { services, user }) => {
        return await services.Bookmarks.toggleBookmark(user.address, postId)
    }
)
