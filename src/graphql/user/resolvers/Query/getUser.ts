import type { QueryResolvers } from '@/graphql/types';

export const getUser: NonNullable<QueryResolvers['getUser']> = (_parent, { input }, { services }) =>
  services.User.getUser(input);
