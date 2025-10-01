import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { BaseContentMapper } from './content/schema.mappers';
import { CommentMapper } from './comment/schema.mappers';
import { PostMapper } from './post/schema.mappers';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date | string; output: Date | string; }
  /** ISO-8601 Date-Time string (e.g. 2024-04-17T15:22:00.000Z) */
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
  /** Unix epoch in milliseconds (number). */
  Timestamp: { input: Date | string | number; output: Date | string | number; }
  Upload: { input: any; output: any; }
};

export type AgentInput = {
  message: Scalars['String']['input'];
};

export type AgentOutput = {
  __typename?: 'AgentOutput';
  done?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Message>;
};

export type BaseContent = {
  __typename?: 'BaseContent';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  user: User;
  visibility: VisibilitySetting;
};

export type CacheControlScope =
  | 'PRIVATE'
  | 'PUBLIC';

export type Comment = {
  __typename?: 'Comment';
  base: BaseContent;
  body: Scalars['String']['output'];
  id: Scalars['String']['output'];
  parent?: Maybe<Comment>;
  post: Post;
  replies?: Maybe<Array<Comment>>;
};


export type CommentrepliesArgs = {
  page?: InputMaybe<PaginationInput>;
};

export type CommentByIdentifierInput =
  { id: Scalars['Int']['input']; };

export type CommentsFilterInput = {
  parentId?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCommentInput = {
  body: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
};

export type CreatePostInput = {
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
  visibility: VisibilitySetting;
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  cover?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Array<SocialInput>>;
  username: Scalars['String']['input'];
};

export type Edge = {
  __typename?: 'Edge';
  followedAt?: Maybe<Scalars['Date']['output']>;
  isBlocked: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
  user: User;
};

export type EdgeByIdentifierInput = {
  toUserId: Scalars['Int']['input'];
};

export type EdgeState =
  | 'BLOCK'
  | 'FOLLOW'
  | 'NONE';

export type HidePostInput = {
  postId: Scalars['Int']['input'];
};

export type MediaAttachment = {
  __typename?: 'MediaAttachment';
  cid: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  hidePost?: Maybe<Scalars['Boolean']['output']>;
  sendHumanMessage?: Maybe<Message>;
  setEdgeStatus: Edge;
  updateComment: Comment;
  updatePost: Post;
  updateUser: User;
};


export type MutationcreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationcreatePostArgs = {
  input: CreatePostInput;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
};


export type MutationhidePostArgs = {
  input: HidePostInput;
};


export type MutationsendHumanMessageArgs = {
  input: AgentInput;
};


export type MutationsetEdgeStatusArgs = {
  input: SetEdgeStatusInput;
};


export type MutationupdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationupdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationupdateUserArgs = {
  input: UpdateUserInput;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Post = {
  __typename?: 'Post';
  base: BaseContent;
  body: Scalars['String']['output'];
  comments?: Maybe<Array<Comment>>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};


export type PostcommentsArgs = {
  page?: InputMaybe<PaginationInput>;
};

export type PostByIdentifierInput =
  { id: Scalars['Int']['input']; };

export type PostFilterInput = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String']['output'];
  cover?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComment?: Maybe<Comment>;
  getComments?: Maybe<Array<Comment>>;
  getEdgeStatus?: Maybe<Edge>;
  getPost?: Maybe<Post>;
  getPosts: Array<Post>;
  getUser?: Maybe<User>;
};


export type QuerygetCommentArgs = {
  input: CommentByIdentifierInput;
};


export type QuerygetCommentsArgs = {
  input: CommentsFilterInput;
  page?: InputMaybe<PaginationInput>;
};


export type QuerygetEdgeStatusArgs = {
  input: EdgeByIdentifierInput;
};


export type QuerygetPostArgs = {
  input: PostByIdentifierInput;
};


export type QuerygetPostsArgs = {
  input: PostFilterInput;
  page?: InputMaybe<PaginationInput>;
};


export type QuerygetUserArgs = {
  input: UserByIdentifierInput;
};

export type SetEdgeStatusInput = {
  status: EdgeState;
  toUserId: Scalars['Int']['input'];
};

export type Social = {
  __typename?: 'Social';
  platform: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SocialInput = {
  platform: Scalars['String']['input'];
  url: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAgentMessage?: Maybe<AgentOutput>;
};

export type UpdateCommentInput = {
  body: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilitySetting>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Array<SocialInput>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  profile?: Maybe<Profile>;
  socials?: Maybe<Array<Social>>;
  verified: Scalars['Boolean']['output'];
};

export type UserByIdentifierInput =
  { address: Scalars['String']['input']; email?: never; id?: never; }
  |  { address?: never; email: Scalars['String']['input']; id?: never; }
  |  { address?: never; email?: never; id: Scalars['Int']['input']; };

export type UsersFilterInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
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
  AgentInput: AgentInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AgentOutput: ResolverTypeWrapper<AgentOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BaseContent: ResolverTypeWrapper<BaseContentMapper>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
  Comment: ResolverTypeWrapper<CommentMapper>;
  CommentByIdentifierInput: CommentByIdentifierInput;
  CommentsFilterInput: CommentsFilterInput;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Edge: ResolverTypeWrapper<Edge>;
  EdgeByIdentifierInput: EdgeByIdentifierInput;
  EdgeState: ResolverTypeWrapper<'NONE' | 'FOLLOW' | 'BLOCK'>;
  HidePostInput: HidePostInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  MediaAttachment: ResolverTypeWrapper<MediaAttachment>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationInput: PaginationInput;
  Post: ResolverTypeWrapper<PostMapper>;
  PostByIdentifierInput: PostByIdentifierInput;
  PostFilterInput: PostFilterInput;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  SetEdgeStatusInput: SetEdgeStatusInput;
  Social: ResolverTypeWrapper<Social>;
  SocialInput: SocialInput;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserByIdentifierInput: UserByIdentifierInput;
  UsersFilterInput: UsersFilterInput;
  VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AgentInput: AgentInput;
  String: Scalars['String']['output'];
  AgentOutput: AgentOutput;
  Boolean: Scalars['Boolean']['output'];
  BaseContent: BaseContentMapper;
  Int: Scalars['Int']['output'];
  Comment: CommentMapper;
  CommentByIdentifierInput: CommentByIdentifierInput;
  CommentsFilterInput: CommentsFilterInput;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  Edge: Edge;
  EdgeByIdentifierInput: EdgeByIdentifierInput;
  HidePostInput: HidePostInput;
  JSON: Scalars['JSON']['output'];
  MediaAttachment: MediaAttachment;
  Message: Message;
  Mutation: {};
  PaginationInput: PaginationInput;
  Post: PostMapper;
  PostByIdentifierInput: PostByIdentifierInput;
  PostFilterInput: PostFilterInput;
  Profile: Profile;
  Query: {};
  SetEdgeStatusInput: SetEdgeStatusInput;
  Social: Social;
  SocialInput: SocialInput;
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserByIdentifierInput: UserByIdentifierInput;
  UsersFilterInput: UsersFilterInput;
};

export type cacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type cacheControlDirectiveResolver<Result, Parent, ContextType = GQL.ContextType, Args = cacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AgentOutputResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['AgentOutput'] = ResolversParentTypes['AgentOutput']> = {
  done?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseContentResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['BaseContent'] = ResolversParentTypes['BaseContent']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['VisibilitySetting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CacheControlScopeResolvers = EnumResolverSignature<{ PRIVATE?: any, PUBLIC?: any }, ResolversTypes['CacheControlScope']>;

export type CommentResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  base?: Resolver<ResolversTypes['BaseContent'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  replies?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType, Partial<CommentrepliesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EdgeResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  followedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  isBlocked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeStateResolvers = EnumResolverSignature<{ BLOCK?: any, FOLLOW?: any, NONE?: any }, ResolversTypes['EdgeState']>;

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MediaAttachmentResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['MediaAttachment'] = ResolversParentTypes['MediaAttachment']> = {
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationcreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationcreatePostArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  hidePost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationhidePostArgs, 'input'>>;
  sendHumanMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationsendHumanMessageArgs, 'input'>>;
  setEdgeStatus?: Resolver<ResolversTypes['Edge'], ParentType, ContextType, RequireFields<MutationsetEdgeStatusArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationupdatePostArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
};

export type PostResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  base?: Resolver<ResolversTypes['BaseContent'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType, Partial<PostcommentsArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetCommentArgs, 'input'>>;
  getComments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType, RequireFields<QuerygetCommentsArgs, 'input'>>;
  getEdgeStatus?: Resolver<Maybe<ResolversTypes['Edge']>, ParentType, ContextType, RequireFields<QuerygetEdgeStatusArgs, 'input'>>;
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostArgs, 'input'>>;
  getPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsArgs, 'input'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserArgs, 'input'>>;
};

export type SocialResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onAgentMessage?: SubscriptionResolver<Maybe<ResolversTypes['AgentOutput']>, "onAgentMessage", ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = GQL.ContextType, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  socials?: Resolver<Maybe<Array<ResolversTypes['Social']>>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingResolvers = EnumResolverSignature<{ FOLLOWERS_ONLY?: any, PRIVATE?: any, PUBLIC?: any }, ResolversTypes['VisibilitySetting']>;

export type Resolvers<ContextType = GQL.ContextType> = {
  AgentOutput?: AgentOutputResolvers<ContextType>;
  BaseContent?: BaseContentResolvers<ContextType>;
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Edge?: EdgeResolvers<ContextType>;
  EdgeState?: EdgeStateResolvers;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
};

export type DirectiveResolvers<ContextType = GQL.ContextType> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
