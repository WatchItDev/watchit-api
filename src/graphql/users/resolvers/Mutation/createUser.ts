import { withEmail } from '@/graphql/_base/hof/inject';
import type { MutationResolvers } from './../../../../schema/types';

export const createUser: NonNullable<MutationResolvers['createUser']> = withEmail(
  async (_parent, { input }, ctx) => {
    return ctx.services.Users.createUser({
      ...input,
      email: ctx.email,
    });
  },
);
