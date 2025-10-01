import type { Comment, CommentsFilter } from '@/modules/comment/types';
import type { Store } from '@/modules/types';

export const CommentsQueries = (store: Store) => ({
  async getComment(where: Id): Promise<Comment | null> {
    return store.pa.comment.findUnique({
      include: { base: true },
      where,
    });
  },

  async getCommentOrThrow(where: Id): Promise<Comment> {
    return store.pa.comment.findUniqueOrThrow({
      include: { base: true },
      where,
    });
  },

  async getComments(where: CommentsFilter, page?: Pagination): Promise<Comment[]> {
    return store.pa.comment.findMany({
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
      include: { base: true },
      where,
    });
  },
});
