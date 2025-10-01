import type { Edge, GetRelationStatusDTO, SetEdgeStatusDTO } from '@/modules/edge/types';
import type { Context } from '@/modules/types';

export const EdgeService = (ctx: Context) => ({
  async setEdgeStatus(input: SetEdgeStatusDTO): Promise<Edge> {
    return ctx.ds.Edge.upsert({
      toUserId: input.toUserId,
      fromUserId: input.userId,
      state: input.status,
    });
  },

  async getEdgeStatus(input: GetRelationStatusDTO): Promise<Edge | null> {
    // get the existing relation to return the expected status
    return ctx.ds.Edge.getEdge({
      toUserId: input.toUserId,
      fromUserId: input.userId,
    });
  },
});
