import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/schema/types';

export const createTip: NonNullable<MutationResolvers['createTip']> = withRequireAuth(
  async (_p, { input }, { services, user }) => {
    const tip = await services.Tips.createTip(user.address, {
      postId: input.postId,
      creator: input.creator,
      amount: input.amount,
      txHash: input.txHash ?? null,
      message: input.message ?? null,
    });
    return tip as any;
  },
);
