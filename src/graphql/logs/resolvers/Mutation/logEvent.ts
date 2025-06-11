import type { MutationResolvers } from '@/schema/types'
import { requireAuth } from '@/graphql/hof/auth'

export const logEvent: NonNullable<MutationResolvers['logEvent']> = requireAuth(
    async (_p, { input }, { services, user }) => {
            await services.Logs.logEvent(user.address, input)
            return true
    }
)
