import type { QueryResolvers } from './../../../../schema/types';

export const getPost: NonNullable<QueryResolvers['getPost']> = (_parent, { input }, { services }) =>
  services.Post.getPost(input);
