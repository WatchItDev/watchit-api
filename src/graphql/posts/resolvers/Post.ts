import type { PostResolvers, Post as PostType } from '@/schema/types';

export const Post: PostResolvers = {
  author: (p, _a, { services }) =>
    services.Profile.getProfile(p.author.address),
};
