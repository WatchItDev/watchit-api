import type { Maybe, Post, ResolversTypes, Scalars } from '../../schema/types';

export type CommentMapper = {
  body: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  post?: Maybe<Post>;
  parent?: Maybe<CommentMapper>;
  parentId?: Maybe<Scalars['Int']['output']>;
  postId: Scalars['Int']['output'];
  base: ResolversTypes['BaseContent'];
};
