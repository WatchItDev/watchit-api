import type { Post, RepoCreatePost, RepoUpdatePost } from '@/modules/post/types';
import type { Store } from '@/modules/types';

export const PostCommands = (store: Store) => ({
  async create(input: RepoCreatePost): Promise<Post> {
    const { userId, tags, title, body } = input;
    const base = { userId, tags };

    // content is a base "abstract" table to handle multiple types
    return store.pa.post.create({
      data: { title, body, base: { create: base } },
      include: { base: true },
    });
  },

  async update(input: RepoUpdatePost): Promise<Post> {
    // content is a base "abstract" table to handle multiple types
    const { id, tags, active, title, body } = input;
    const base = { tags, active };

    return store.pa.post.update({
      where: { id },
      data: { title, body, base: { update: base } },
      include: { base: true },
    });
  },
});
