import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date | string; output: Date | string; }
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Block = {
  __typename?: 'Block';
  blocked: User;
  blockedAt: Scalars['DateTime']['output'];
  blocker: User;
};

export type CacheControlScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  user: User;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  participants: Array<User>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Follow = {
  __typename?: 'Follow';
  followed: User;
  followedAt: Scalars['DateTime']['output'];
  follower: User;
};

export type MediaAttachment = {
  __typename?: 'MediaAttachment';
  id: Scalars['ID']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
};

export type MediaType =
  | 'AUDIO'
  | 'IMAGE'
  | 'VIDEO';

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<Maybe<MediaAttachment>>>;
  read: Scalars['Boolean']['output'];
  recipient: User;
  sender: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Creates a new user profile based on the input data.
   * Returns the recent created user.
   */
  CreateProfile: User;
};


export type MutationCreateProfileArgs = {
  input: UserInput;
};

export type Mute = {
  __typename?: 'Mute';
  muted: User;
  mutedAt: Scalars['DateTime']['output'];
  muter: User;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<MediaAttachment>>;
  quoteOf?: Maybe<Post>;
  replyTo?: Maybe<Post>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility: VisibilitySetting;
};

export type Query = {
  __typename?: 'Query';
  Profile: User;
};


export type QueryProfileArgs = {
  input: UserByInput;
};

export type Reaction = {
  __typename?: 'Reaction';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: Post;
  type: ReactionType;
  user: User;
};

export type ReactionType =
  | 'BOOKMARK'
  | 'LIKE'
  | 'REPOST';

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type UserByInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type UserInput = {
  address: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type VisibilitySetting =
  | 'FOLLOWERS_ONLY'
  | 'PRIVATE'
  | 'PUBLIC';



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Block: ResolverTypeWrapper<Block>;
  CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'post'> & { post: ResolversTypes['Post'] }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Conversation: ResolverTypeWrapper<Omit<Conversation, 'messages'> & { messages: Array<ResolversTypes['Message']> }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FilterInput: FilterInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Follow: ResolverTypeWrapper<Follow>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  MediaAttachment: ResolverTypeWrapper<Omit<MediaAttachment, 'type'> & { type: ResolversTypes['MediaType'] }>;
  MediaType: ResolverTypeWrapper<'IMAGE' | 'VIDEO' | 'AUDIO'>;
  Message: ResolverTypeWrapper<Omit<Message, 'media'> & { media?: Maybe<Array<Maybe<ResolversTypes['MediaAttachment']>>> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Mute: ResolverTypeWrapper<Mute>;
  Post: ResolverTypeWrapper<Omit<Post, 'media' | 'quoteOf' | 'replyTo' | 'visibility'> & { media?: Maybe<Array<ResolversTypes['MediaAttachment']>>, quoteOf?: Maybe<ResolversTypes['Post']>, replyTo?: Maybe<ResolversTypes['Post']>, visibility: ResolversTypes['VisibilitySetting'] }>;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Omit<Reaction, 'post' | 'type'> & { post: ResolversTypes['Post'], type: ResolversTypes['ReactionType'] }>;
  ReactionType: ResolverTypeWrapper<'LIKE' | 'REPOST' | 'BOOKMARK'>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserByInput: UserByInput;
  UserInput: UserInput;
  VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Block: Block;
  Comment: Omit<Comment, 'post'> & { post: ResolversParentTypes['Post'] };
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  Conversation: Omit<Conversation, 'messages'> & { messages: Array<ResolversParentTypes['Message']> };
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  FilterInput: FilterInput;
  Int: Scalars['Int']['output'];
  Follow: Follow;
  JSON: Scalars['JSON']['output'];
  MediaAttachment: MediaAttachment;
  Message: Omit<Message, 'media'> & { media?: Maybe<Array<Maybe<ResolversParentTypes['MediaAttachment']>>> };
  Boolean: Scalars['Boolean']['output'];
  Mutation: {};
  Mute: Mute;
  Post: Omit<Post, 'media' | 'quoteOf' | 'replyTo'> & { media?: Maybe<Array<ResolversParentTypes['MediaAttachment']>>, quoteOf?: Maybe<ResolversParentTypes['Post']>, replyTo?: Maybe<ResolversParentTypes['Post']> };
  Query: {};
  Reaction: Omit<Reaction, 'post'> & { post: ResolversParentTypes['Post'] };
  Upload: Scalars['Upload']['output'];
  User: User;
  UserByInput: UserByInput;
  UserInput: UserInput;
};

export type cacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type cacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = cacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  blocked?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  blockedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  blocker?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CacheControlScopeResolvers = EnumResolverSignature<{ PRIVATE?: any, PUBLIC?: any }, ResolversTypes['CacheControlScope']>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FollowResolvers<ContextType = any, ParentType extends ResolversParentTypes['Follow'] = ResolversParentTypes['Follow']> = {
  followed?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  followedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MediaAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaAttachment'] = ResolversParentTypes['MediaAttachment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTypeResolvers = EnumResolverSignature<{ AUDIO?: any, IMAGE?: any, VIDEO?: any }, ResolversTypes['MediaType']>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<ResolversTypes['MediaAttachment']>>>, ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  CreateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateProfileArgs, 'input'>>;
};

export type MuteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mute'] = ResolversParentTypes['Mute']> = {
  muted?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  mutedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  muter?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<ResolversTypes['MediaAttachment']>>, ParentType, ContextType>;
  quoteOf?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  replyTo?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['VisibilitySetting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Profile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryProfileArgs, 'input'>>;
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ReactionType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionTypeResolvers = EnumResolverSignature<{ BOOKMARK?: any, LIKE?: any, REPOST?: any }, ResolversTypes['ReactionType']>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingResolvers = EnumResolverSignature<{ FOLLOWERS_ONLY?: any, PRIVATE?: any, PUBLIC?: any }, ResolversTypes['VisibilitySetting']>;

export type Resolvers<ContextType = any> = {
  Block?: BlockResolvers<ContextType>;
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Conversation?: ConversationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Follow?: FollowResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  MediaType?: MediaTypeResolvers;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Mute?: MuteResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  ReactionType?: ReactionTypeResolvers;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
