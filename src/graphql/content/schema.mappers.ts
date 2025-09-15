import type { Maybe, Scalars, User, VisibilitySetting } from '../../schema/types';

export type BaseContentMapper = {
  id: Scalars['Int']['output'];
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  visibility: VisibilitySetting;
  userId: Scalars['Int']['output'];
  user?: Maybe<User>;
};
