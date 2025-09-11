import type { QueryResolvers } from './../../../../schema/types';

export const getUsers: NonNullable<QueryResolvers['getUsers']> = (
  _parent,
  { input, pagination },
  { services },
) => services.Users.getUsers(input, pagination);
