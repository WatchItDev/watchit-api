import type { ResolversTypes, RelationState, Scalars } from '../../schema/types';

export type RelationMapper = {
  state: RelationState;
  updatedAt: Scalars['Date']['output'];
  toUserId: Scalars['Int']['output'];
  fromUserId: ResolversTypes['BaseContent'];
};
