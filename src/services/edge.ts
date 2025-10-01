import type { Edge } from '../externals/prisma';
import type { EdgeByIdentifierInput, SetEdgeStatusInput } from '../schema/types';
import type { UserId } from '@/types';
import { ServiceManager } from './manager';

export type SetEdgeStatusDTO = SetEdgeStatusInput & UserId;
export type GetRelationStatusDTO = EdgeByIdentifierInput & UserId;

export class EdgeService extends ServiceManager {
  async setEdgeStatus(input: SetEdgeStatusDTO): Promise<Edge> {
    const data = {
      toUserId: input.toUserId,
      fromUserId: input.userId,
      state: input.status,
    };

    return this.ds.Edge.upsert(
      {
        fromUserId_toUserId: {
          toUserId: input.toUserId,
          fromUserId: input.userId,
        },
      },
      data,
    );
  }

  async getEdgeStatus(input: GetRelationStatusDTO): Promise<Edge | null> {
    // get the existing relation to return the expected status
    return this.ds.Edge.getEdge({
      fromUserId_toUserId: {
        toUserId: input.toUserId,
        fromUserId: input.userId,
      },
    });
  }
}
