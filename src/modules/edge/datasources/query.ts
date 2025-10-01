import type { Edge, EdgeFilter, EdgesFilter } from '@/modules/edge/types';
import type { Store } from '@/modules/types';

export const EdgeQueries = (store: Store) => ({
  async getEdge(input: EdgeFilter): Promise<Edge | null> {
    const { fromUserId, toUserId } = input;
    const where = { fromUserId_toUserId: { fromUserId, toUserId } };
    return store.pa.edge.findUnique({ where });
  },

  async getEdges(where: EdgesFilter, page?: Pagination): Promise<Edge[]> {
    return store.pa.edge.findMany({
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
      where,
    });
  },
});
