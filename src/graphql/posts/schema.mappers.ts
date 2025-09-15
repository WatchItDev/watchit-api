import type { ResolversTypes, Scalars } from '../../schema/types';

export type PostMapper = {
  id: Scalars['Int']['output'];
  body: Scalars['String']['output'];
  title: Scalars['String']['output'];
  base: ResolversTypes['BaseContent'];
};
