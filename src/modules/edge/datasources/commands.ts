import type { Edge, RepoDeleteEdge, RepoUpsertEdge } from '@/modules/edge/types';
import type { Store } from '@/modules/types';

export const EdgeCommands = (store: Store) => ({
  upsert(input: RepoUpsertEdge): Promise<Edge> {
    const { fromUserId, toUserId, state } = input;
    const data = { fromUserId, toUserId, state };
    const where = { fromUserId_toUserId: { fromUserId, toUserId } };
    return store.pa.edge.upsert({ where, update: { ...data }, create: { ...data } });
  },

  delete(input: RepoDeleteEdge): Promise<Edge> {
    const { fromUserId, toUserId } = input;
    const where = { fromUserId_toUserId: { fromUserId, toUserId } };
    return store.pa.edge.delete({ where });
  },
});
