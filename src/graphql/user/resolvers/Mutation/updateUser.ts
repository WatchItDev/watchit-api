import { withRequireAuth } from '@/graphql/_base/hof/auth';
import type { MutationResolvers } from '@/graphql/types';

export const updateUser: NonNullable<MutationResolvers['updateUser']> = withRequireAuth(
  (_parent, { input }, { user: { id }, services }) =>
    services.Users.updateUser({
      ...input,
      id,
    }),
);
