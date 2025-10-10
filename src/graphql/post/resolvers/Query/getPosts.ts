import type { QueryResolvers } from '@/graphql/types';

export const getPosts: NonNullable<QueryResolvers['getPosts']> = (_parent, { input, page }, { services }) => {
  const filter = input.userId != null ? { userId: input.userId } : {};

  const pagination: Pagination | undefined = page
    ? {
        limit: page.limit ?? undefined,
        offset: page.offset ?? undefined,
      }
    : undefined;

  return services.Post.getPosts(filter, pagination);
};
