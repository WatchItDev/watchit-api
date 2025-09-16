import type { UserId, Relation } from '../externals/prisma';
import type { RelationByIdentifierInput, SetRelationStatusInput } from '../schema/types';
import { ServiceManager } from './manager';

export type SetRelationStatusDTO = SetRelationStatusInput & UserId;
export type GetRelationStatusDTO = RelationByIdentifierInput & UserId;

export class RelationsService extends ServiceManager {

  async setFollowStatus(input: SetRelationStatusDTO): Promise<Relation> {
    const data = {
      toUserId: input.toUserId,
      fromUserId: input.userId,
      state: input.status,
    };

    return this.ds.Relation.upsert({
      fromUserId_toUserId: {
        toUserId: input.toUserId,
        fromUserId: input.userId,
      },
    }, data);
  }

  async getFollowStatus(input: GetRelationStatusDTO): Promise<Relation | null> {
    // get the existing relation to return the expected status
    return this.ds.Relation.getRelation({
      fromUserId_toUserId: {
        toUserId: input.toUserId,
        fromUserId: input.userId,
      },
    });

  }
}
