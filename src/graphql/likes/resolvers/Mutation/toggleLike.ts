import type { MutationResolvers } from '@/schema/types'
import { requireAuth } from '@/graphql/hof/auth'

export const toggleLike: NonNullable<MutationResolvers['toggleLike']> = requireAuth(
    async (_p, { input: { targetId, targetType } }, { services, user }) =>
        services.Likes.toggleLike(user.address, targetId, targetType)
)
