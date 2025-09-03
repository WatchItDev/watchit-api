import type { SubscriptionResolvers } from "./../../../../schema/types";
export const onAiMessage: NonNullable<SubscriptionResolvers["onAiMessage"]> = {
  subscribe: (_, __, { ctx: { pubsub } }) =>
    pubsub.asyncIterableIterator("ASSISTANT_CHAT"),
};
