import type { SubscriptionResolvers } from '@/graphql/types';
export const onAiMessage: NonNullable<SubscriptionResolvers['onAiMessage']> = {
  subscribe: (_, __, { ctx: { pubsub } }) => pubsub.asyncIterableIterator('ASSISTANT_CHAT'),
};
