export { Edge } from '@/infra/database';
import { EdgeState } from '@/infra/database';

export type EdgeFilter = { fromUserId: number; toUserId: number };
export type EdgesFilter = Tools.AtLeastOne<
  EdgeFilter & { state: EdgeState },
  'fromUserId' | 'toUserId' | 'state'
>;

export type RepoDeleteEdge = {
  fromUserId: number;
  toUserId: number;
};

export type RepoUpsertEdge = {
  fromUserId: number;
  toUserId: number;
  state: EdgeState;
};

export type SetEdgeStatusDTO = {
  toUserId: number;
  status: EdgeState;
} & UserId;

export type GetRelationStatusDTO = {
  toUserId: number;
} & UserId;
