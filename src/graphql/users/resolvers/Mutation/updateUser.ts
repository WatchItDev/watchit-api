import { requireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from './../../../../schema/types';

export const updateUser: NonNullable<MutationResolvers['updateUser']> = requireAuth(
  (_parent, { input }, ctx) =>
    ctx.services.Users.updateUser({
      ...input,
      id: ctx.user.id,
    }),
);
