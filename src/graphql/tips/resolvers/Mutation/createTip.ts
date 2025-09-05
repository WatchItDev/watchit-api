import type { MutationResolvers } from '@/schema/types';
import { requireAuth } from '@/graphql/hof/auth';

export const createTip: NonNullable<MutationResolvers['createTip']> =
  requireAuth(async (_p, { input }, { services, user }) => {
    const tip = await services.Tips.createTip(user.address, {
      postId: input.postId,
      creator: input.creator,
      amount: input.amount,
      txHash: input.txHash ?? null,
      message: input.message ?? null,
    });
    return tip as any;
  });
