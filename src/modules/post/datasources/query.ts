import type { Repo } from '@/infra/database';
import type { Post } from '@/modules/post/types';
import type { Store } from '@/modules/types';

export const PostQueries = (store: Store) => ({
  async getPost(where: Id): Promise<Post | null> {
    return store.pa.post.findUnique({
      include: { base: true },
      where,
    });
  },

  async getPostOrThrow(where: Id): Promise<Post> {
    return store.pa.post.findUniqueOrThrow({
      include: { base: true },
      where,
    });
  },

  async getPosts(where: Repo.PostWhereInput | undefined, page?: Pagination): Promise<Post[]> {
    return store.pa.post.findMany({
      include: { base: true },
      where,
      orderBy: [
        {
          base: {
            createdAt: 'desc',
          },
        },
      ],
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
    });
  },
});
