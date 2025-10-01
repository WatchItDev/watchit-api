import type { EdgeState, ResolversTypes, Scalars } from '@/graphql/types';

export type EdgeMapper = {
  state: EdgeState;
  updatedAt: Scalars['Date']['output'];
  toUserId: Scalars['Int']['output'];
  fromUserId: ResolversTypes['BaseContent'];
};
