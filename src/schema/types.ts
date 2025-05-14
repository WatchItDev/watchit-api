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
  /** ISO-8601 Date-Time string (e.g. 2024-04-17T15:22:00.000Z) */
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
  /** Unix epoch in milliseconds (number). */
  Timestamp: { input: Date | string | number; output: Date | string | number; }
  Upload: { input: any; output: any; }
};

export type AddXPInput = {
  action: Scalars['String']['input'];
  address: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
};

export type BookmarkPostInput = {
  postId: Scalars['String']['input'];
};

export type CacheControlScope =
  | 'PRIVATE'
  | 'PUBLIC';

/** A comment on a post, or a reply to another comment. */
export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  likeCount: Scalars['Int']['output'];
  parentComment?: Maybe<Comment>;
  post: Post;
  repliesCount: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  parentComment?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};

export type CreatePostInput = {
  authorAddress: Scalars['String']['input'];
  cid: Scalars['String']['input'];
  description: Scalars['String']['input'];
  media: Array<MediaAttachmentInput>;
  title: Scalars['String']['input'];
  visibility: VisibilitySetting;
};

export type FilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FollowInput = {
  targetAddress: Scalars['String']['input'];
};

export type LikeCommentInput = {
  commentId: Scalars['String']['input'];
};

export type LikePostInput = {
  postId: Scalars['String']['input'];
};

export type MediaAttachment = {
  __typename?: 'MediaAttachment';
  cid: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type MediaAttachmentInput = {
  cid: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  hideComment: Scalars['Boolean']['output'];
  hidePost: Scalars['Boolean']['output'];
  incrementPostView: Post;
  toggleBookmark: Scalars['Boolean']['output'];
  toggleCommentLike: Scalars['Boolean']['output'];
  toggleFollow: Scalars['Boolean']['output'];
  togglePostLike: Scalars['Boolean']['output'];
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
  input: UserInput;
};


export type MutationhideCommentArgs = {
  commentId: Scalars['String']['input'];
};


export type MutationhidePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationincrementPostViewArgs = {
  postId: Scalars['String']['input'];
};


export type MutationtoggleBookmarkArgs = {
  input: BookmarkPostInput;
};


export type MutationtoggleCommentLikeArgs = {
  input: LikeCommentInput;
};


export type MutationtoggleFollowArgs = {
  input: FollowInput;
};


export type MutationtogglePostLikeArgs = {
  input: LikePostInput;
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

export type Post = {
  __typename?: 'Post';
  author: User;
  bookmarkCount: Scalars['Int']['output'];
  cid: Scalars['String']['output'];
  commentCount: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  likeCount: Scalars['Int']['output'];
  media: Array<MediaAttachment>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  viewCount: Scalars['Int']['output'];
  visibility: VisibilitySetting;
};

export type Query = {
  __typename?: 'Query';
  getActiveUsers: Array<User>;
  getAllPosts: Array<Post>;
  getCommentsByPost: Array<Comment>;
  getIsBookmarked: Scalars['Boolean']['output'];
  getIsCommentLiked: Scalars['Boolean']['output'];
  getIsFollowing: Scalars['Boolean']['output'];
  getIsPostLiked: Scalars['Boolean']['output'];
  getPopularPosts: Array<Post>;
  getPopularUsers: Array<User>;
  getPost?: Maybe<Post>;
  getPosts: Array<Post>;
  getPostsByAuthor: Array<Post>;
  getRecentPosts: Array<Post>;
  getRecentUsers: Array<User>;
  getRepliesByComment: Array<Comment>;
  getUser?: Maybe<User>;
  getUserBookmarks: Array<Post>;
  getUserFollowers: Array<User>;
  getUserFollowing: Array<User>;
  getUserXPHistory: Array<XPEntry>;
  getUsers: Array<User>;
};


export type QuerygetActiveUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetAllPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetCommentsByPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['String']['input'];
};


export type QuerygetIsBookmarkedArgs = {
  postId: Scalars['String']['input'];
};


export type QuerygetIsCommentLikedArgs = {
  commentId: Scalars['String']['input'];
};


export type QuerygetIsFollowingArgs = {
  targetAddress: Scalars['String']['input'];
};


export type QuerygetIsPostLikedArgs = {
  postId: Scalars['String']['input'];
};


export type QuerygetPopularPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetPopularUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetPostArgs = {
  id: Scalars['String']['input'];
};


export type QuerygetPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerygetPostsByAuthorArgs = {
  author: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetRecentPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetRecentUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetRepliesByCommentArgs = {
  commentId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserArgs = {
  input: UserByInput;
};


export type QuerygetUserBookmarksArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserFollowersArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserFollowingArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserXPHistoryArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SocialLink = {
  __typename?: 'SocialLink';
  platform: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SocialLinkInput = {
  platform: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UpdateCommentInput = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};

export type UpdatePostInput = {
  cid?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Array<MediaAttachmentInput>>;
  postId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VisibilitySetting>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  bookmarksCount: Scalars['Int']['output'];
  coverPicture: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followersCount: Scalars['Int']['output'];
  followingCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  publicationsCount: Scalars['Int']['output'];
  socialLinks?: Maybe<Array<SocialLink>>;
  updatedAt: Scalars['Timestamp']['output'];
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  xpBalance: Scalars['Int']['output'];
};

export type UserByInput = {
  address: Scalars['String']['input'];
  idSession?: InputMaybe<Scalars['String']['input']>;
};

export type UserInput = {
  address: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  username: Scalars['String']['input'];
};

export type VisibilitySetting =
  | 'FOLLOWERS_ONLY'
  | 'PRIVATE'
  | 'PUBLIC';

export type XPEntry = {
  __typename?: 'XPEntry';
  action: Scalars['String']['output'];
  amount: Scalars['Int']['output'];
  balanceAfter: Scalars['Int']['output'];
  balanceBefore: Scalars['Int']['output'];
  createdAt: Scalars['Timestamp']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};



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
  AddXPInput: AddXPInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  BookmarkPostInput: BookmarkPostInput;
  CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'parentComment' | 'post'> & { parentComment?: Maybe<ResolversTypes['Comment']>, post: ResolversTypes['Post'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LikeCommentInput: LikeCommentInput;
  LikePostInput: LikePostInput;
  MediaAttachment: ResolverTypeWrapper<MediaAttachment>;
  MediaAttachmentInput: MediaAttachmentInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Omit<Post, 'visibility'> & { visibility: ResolversTypes['VisibilitySetting'] }>;
  Query: ResolverTypeWrapper<{}>;
  SocialLink: ResolverTypeWrapper<SocialLink>;
  SocialLinkInput: SocialLinkInput;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserByInput: UserByInput;
  UserInput: UserInput;
  VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
  XPEntry: ResolverTypeWrapper<XPEntry>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddXPInput: AddXPInput;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  BookmarkPostInput: BookmarkPostInput;
  Comment: Omit<Comment, 'parentComment' | 'post'> & { parentComment?: Maybe<ResolversParentTypes['Comment']>, post: ResolversParentTypes['Post'] };
  Boolean: Scalars['Boolean']['output'];
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  JSON: Scalars['JSON']['output'];
  LikeCommentInput: LikeCommentInput;
  LikePostInput: LikePostInput;
  MediaAttachment: MediaAttachment;
  MediaAttachmentInput: MediaAttachmentInput;
  Mutation: {};
  Post: Post;
  Query: {};
  SocialLink: SocialLink;
  SocialLinkInput: SocialLinkInput;
  Timestamp: Scalars['Timestamp']['output'];
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserByInput: UserByInput;
  UserInput: UserInput;
  XPEntry: XPEntry;
  ID: Scalars['ID']['output'];
};

export type cacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
  maxAge?: Maybe<Scalars['Int']['input']>;
  scope?: Maybe<CacheControlScope>;
};

export type cacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = cacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheControlScopeResolvers = EnumResolverSignature<{ PRIVATE?: any, PUBLIC?: any }, ResolversTypes['CacheControlScope']>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  repliesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MediaAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaAttachment'] = ResolversParentTypes['MediaAttachment']> = {
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationcreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationcreatePostArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  hideComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationhideCommentArgs, 'commentId'>>;
  hidePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationhidePostArgs, 'postId'>>;
  incrementPostView?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationincrementPostViewArgs, 'postId'>>;
  toggleBookmark?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleBookmarkArgs, 'input'>>;
  toggleCommentLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleCommentLikeArgs, 'input'>>;
  toggleFollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleFollowArgs, 'input'>>;
  togglePostLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtogglePostLikeArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationupdatePostArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  bookmarkCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  media?: Resolver<Array<ResolversTypes['MediaAttachment']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['VisibilitySetting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getActiveUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetActiveUsersArgs>>;
  getAllPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetAllPostsArgs>>;
  getCommentsByPost?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetCommentsByPostArgs, 'postId'>>;
  getIsBookmarked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsBookmarkedArgs, 'postId'>>;
  getIsCommentLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsCommentLikedArgs, 'commentId'>>;
  getIsFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsFollowingArgs, 'targetAddress'>>;
  getIsPostLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsPostLikedArgs, 'postId'>>;
  getPopularPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetPopularPostsArgs>>;
  getPopularUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetPopularUsersArgs>>;
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostArgs, 'id'>>;
  getPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsArgs, 'query'>>;
  getPostsByAuthor?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsByAuthorArgs, 'author'>>;
  getRecentPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetRecentPostsArgs>>;
  getRecentUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetRecentUsersArgs>>;
  getRepliesByComment?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetRepliesByCommentArgs, 'commentId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserArgs, 'input'>>;
  getUserBookmarks?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetUserBookmarksArgs, 'address'>>;
  getUserFollowers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowersArgs, 'address'>>;
  getUserFollowing?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowingArgs, 'address'>>;
  getUserXPHistory?: Resolver<Array<ResolversTypes['XPEntry']>, ParentType, ContextType, RequireFields<QuerygetUserXPHistoryArgs, 'address' | 'limit' | 'offset'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUsersArgs, 'query'>>;
};

export type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = {
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookmarksCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coverPicture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePicture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publicationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  socialLinks?: Resolver<Maybe<Array<ResolversTypes['SocialLink']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  xpBalance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingResolvers = EnumResolverSignature<{ FOLLOWERS_ONLY?: any, PRIVATE?: any, PUBLIC?: any }, ResolversTypes['VisibilitySetting']>;

export type XPEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['XPEntry'] = ResolversParentTypes['XPEntry']> = {
  action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  balanceAfter?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  balanceBefore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SocialLink?: SocialLinkResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
  XPEntry?: XPEntryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
