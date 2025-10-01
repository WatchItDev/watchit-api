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
});
