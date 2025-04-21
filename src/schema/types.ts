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
  /** ISO‑8601 Date‑Time string (e.g. 2024‑04‑17T15:22:00.000Z) */
  DateTime: { input: Date | string; output: Date | string; }
  JSON: { input: any; output: any; }
  /** Unix epoch in milliseconds (number). */
  Timestamp: { input: Date | string | number; output: Date | string | number; }
  Upload: { input: any; output: any; }
};

/** Bookmark / unbookmark a post. */
export type BookmarkPostInput = {
  postId: Scalars['ID']['input'];
};

export type CacheControlScope =
  | 'PRIVATE'
  | 'PUBLIC';

/** A comment on a post, or a reply to another comment. */
export type Comment = {
  __typename?: 'Comment';
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likeCount: Scalars['Int']['output'];
  likes: Array<User>;
  parentComment?: Maybe<Comment>;
  post: Post;
  replies: Array<Comment>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  parentComment?: InputMaybe<Scalars['ID']['input']>;
  postId: Scalars['ID']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  media?: InputMaybe<Array<MediaAttachmentInput>>;
  quoteOf?: InputMaybe<Scalars['ID']['input']>;
  replyTo?: InputMaybe<Scalars['ID']['input']>;
  visibility: VisibilitySetting;
};

export type FilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Follow / unfollow someone. */
export type FollowInput = {
  targetAddress: Scalars['String']['input'];
};

/** Like / unlike a comment. */
export type LikeCommentInput = {
  commentId: Scalars['ID']['input'];
};

/** Like / unlike a post. */
export type LikePostInput = {
  postId: Scalars['ID']['input'];
};

/** An attachment in a post. */
export type MediaAttachment = {
  __typename?: 'MediaAttachment';
  id: Scalars['ID']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
};

export type MediaAttachmentInput = {
  type: MediaType;
  url: Scalars['String']['input'];
};

export type MediaType =
  | 'AUDIO'
  | 'IMAGE'
  | 'VIDEO';

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkPost: Post;
  createComment: Comment;
  createPost: Post;
  /**
   * Create a new user profile with the provided address.
   * Returns the newly created User.
   */
  createUser: User;
  deleteComment: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  followUser: User;
  incrementPostView: Post;
  likeComment: Comment;
  likePost: Post;
  unbookmarkPost: Post;
  unfollowUser: User;
  unlikeComment: Comment;
  unlikePost: Post;
  updateComment: Comment;
  updatePost: Post;
  /** Update the current user's profile with new metadata. */
  updateUser: User;
};


export type MutationbookmarkPostArgs = {
  input: BookmarkPostInput;
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


export type MutationdeleteCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationdeletePostArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationfollowUserArgs = {
  input: FollowInput;
};


export type MutationincrementPostViewArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationlikeCommentArgs = {
  input: LikeCommentInput;
};


export type MutationlikePostArgs = {
  input: LikePostInput;
};


export type MutationunbookmarkPostArgs = {
  input: BookmarkPostInput;
};


export type MutationunfollowUserArgs = {
  input: FollowInput;
};


export type MutationunlikeCommentArgs = {
  input: LikeCommentInput;
};


export type MutationunlikePostArgs = {
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

/** A user’s post/publication. */
export type Post = {
  __typename?: 'Post';
  author: User;
  bookmarkCount: Scalars['Int']['output'];
  bookmarks: Array<User>;
  commentCount: Scalars['Int']['output'];
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likeCount: Scalars['Int']['output'];
  likes: Array<User>;
  media?: Maybe<Array<MediaAttachment>>;
  quoteOf?: Maybe<Post>;
  replyTo?: Maybe<Post>;
  updatedAt?: Maybe<Scalars['Int']['output']>;
  viewCount: Scalars['Int']['output'];
  visibility: VisibilitySetting;
};

export type Query = {
  __typename?: 'Query';
  activeUsers: Array<User>;
  allPosts: Array<Post>;
  commentsByPost: Array<Comment>;
  /** Search users by username prefix. */
  getUsers: Array<User>;
  popularPosts: Array<Post>;
  popularUsers: Array<User>;
  post?: Maybe<Post>;
  postsByAuthor: Array<Post>;
  recentPosts: Array<Post>;
  recentUsers: Array<User>;
  repliesByComment: Array<Comment>;
  /** Retrieve a single user by their wallet address. */
  user?: Maybe<User>;
};


export type QueryactiveUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerycommentsByPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['ID']['input'];
};


export type QuerygetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  prefix: Scalars['String']['input'];
};


export type QuerypopularPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerypopularUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerypostArgs = {
  id: Scalars['ID']['input'];
};


export type QuerypostsByAuthorArgs = {
  author: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryrecentPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryrecentUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryrepliesByCommentArgs = {
  commentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryuserArgs = {
  address: Scalars['String']['input'];
};

/** Represents a social link (e.g. Twitter, GitHub). */
export type SocialLink = {
  __typename?: 'SocialLink';
  /** Name of the platform, e.g. "twitter". */
  platform?: Maybe<Scalars['String']['output']>;
  /** URL of the profile on that platform. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Key-value pair for a social link (e.g. Twitter, GitHub). */
export type SocialLinkInput = {
  /** Name of the platform. */
  platform?: InputMaybe<Scalars['String']['input']>;
  /** URL of the profile. */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  commentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['ID']['input'];
  visibility?: InputMaybe<VisibilitySetting>;
};

/** Data for updating an existing user profile. */
export type UpdateUserInput = {
  /** Wallet address (required). */
  address: Scalars['String']['input'];
  /** New biography. */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** New cover photo URL. */
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  /** New display name. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** New profile picture URL. */
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  /**
   * Array of social links,
   * each with a platform name and URL.
   */
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  /** New handle. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A user’s profile data. */
export type User = {
  __typename?: 'User';
  /** Unique wallet address (non-null). */
  address: Scalars['String']['output'];
  /** Short biography. */
  bio?: Maybe<Scalars['String']['output']>;
  bookmarks: Array<Post>;
  bookmarksCount: Scalars['Int']['output'];
  /** URL to the cover photo. */
  coverPicture?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the user was created (seconds since Epoch). */
  createdAt: Scalars['Int']['output'];
  /** Name displayed on profile. */
  displayName?: Maybe<Scalars['String']['output']>;
  followers: Array<User>;
  /** Total number of followers. */
  followersCount: Scalars['Int']['output'];
  following: Array<User>;
  /** Total number of accounts this user is following. */
  followingCount: Scalars['Int']['output'];
  /** URL to the profile picture. */
  profilePicture?: Maybe<Scalars['String']['output']>;
  publications: Array<Post>;
  /** Total number of publications. */
  publicationsCount: Scalars['Int']['output'];
  /** List of social links. */
  socialLinks?: Maybe<Array<Maybe<SocialLink>>>;
  /** Timestamp when the user was last updated (seconds since Epoch). */
  updatedAt: Scalars['Int']['output'];
  /** User’s handle. */
  username?: Maybe<Scalars['String']['output']>;
  /** Whether the user is verified. */
  verified?: Maybe<Scalars['Boolean']['output']>;
};

/** Filter for fetching a user by wallet address. */
export type UserByInput = {
  /** Wallet address. */
  address?: InputMaybe<Scalars['String']['input']>;
};

/** Required data to create a new user. */
export type UserInput = {
  /** Wallet address (required). */
  address: Scalars['String']['input'];
  /** New biography. */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** New cover photo URL. */
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  /** New display name. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** New profile picture URL. */
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  /**
   * Array of social links,
   * each with a platform name and URL.
   */
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  /** New handle. */
  username?: InputMaybe<Scalars['String']['input']>;
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
  BookmarkPostInput: BookmarkPostInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'author' | 'likes' | 'parentComment' | 'post' | 'replies'> & { author: ResolversTypes['User'], likes: Array<ResolversTypes['User']>, parentComment?: Maybe<ResolversTypes['Comment']>, post: ResolversTypes['Post'], replies: Array<ResolversTypes['Comment']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LikeCommentInput: LikeCommentInput;
  LikePostInput: LikePostInput;
  MediaAttachment: ResolverTypeWrapper<Omit<MediaAttachment, 'type'> & { type: ResolversTypes['MediaType'] }>;
  MediaAttachmentInput: MediaAttachmentInput;
  MediaType: ResolverTypeWrapper<'IMAGE' | 'VIDEO' | 'AUDIO'>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Post: ResolverTypeWrapper<Omit<Post, 'author' | 'bookmarks' | 'comments' | 'likes' | 'media' | 'quoteOf' | 'replyTo' | 'visibility'> & { author: ResolversTypes['User'], bookmarks: Array<ResolversTypes['User']>, comments: Array<ResolversTypes['Comment']>, likes: Array<ResolversTypes['User']>, media?: Maybe<Array<ResolversTypes['MediaAttachment']>>, quoteOf?: Maybe<ResolversTypes['Post']>, replyTo?: Maybe<ResolversTypes['Post']>, visibility: ResolversTypes['VisibilitySetting'] }>;
  Query: ResolverTypeWrapper<{}>;
  SocialLink: ResolverTypeWrapper<SocialLink>;
  SocialLinkInput: SocialLinkInput;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'bookmarks' | 'followers' | 'following' | 'publications'> & { bookmarks: Array<ResolversTypes['Post']>, followers: Array<ResolversTypes['User']>, following: Array<ResolversTypes['User']>, publications: Array<ResolversTypes['Post']> }>;
  UserByInput: UserByInput;
  UserInput: UserInput;
  VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BookmarkPostInput: BookmarkPostInput;
  ID: Scalars['ID']['output'];
  Comment: Omit<Comment, 'author' | 'likes' | 'parentComment' | 'post' | 'replies'> & { author: ResolversParentTypes['User'], likes: Array<ResolversParentTypes['User']>, parentComment?: Maybe<ResolversParentTypes['Comment']>, post: ResolversParentTypes['Post'], replies: Array<ResolversParentTypes['Comment']> };
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
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
  Boolean: Scalars['Boolean']['output'];
  Post: Omit<Post, 'author' | 'bookmarks' | 'comments' | 'likes' | 'media' | 'quoteOf' | 'replyTo'> & { author: ResolversParentTypes['User'], bookmarks: Array<ResolversParentTypes['User']>, comments: Array<ResolversParentTypes['Comment']>, likes: Array<ResolversParentTypes['User']>, media?: Maybe<Array<ResolversParentTypes['MediaAttachment']>>, quoteOf?: Maybe<ResolversParentTypes['Post']>, replyTo?: Maybe<ResolversParentTypes['Post']> };
  Query: {};
  SocialLink: SocialLink;
  SocialLinkInput: SocialLinkInput;
  Timestamp: Scalars['Timestamp']['output'];
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  User: Omit<User, 'bookmarks' | 'followers' | 'following' | 'publications'> & { bookmarks: Array<ResolversParentTypes['Post']>, followers: Array<ResolversParentTypes['User']>, following: Array<ResolversParentTypes['User']>, publications: Array<ResolversParentTypes['Post']> };
  UserByInput: UserByInput;
  UserInput: UserInput;
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
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  parentComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTypeResolvers = EnumResolverSignature<{ AUDIO?: any, IMAGE?: any, VIDEO?: any }, ResolversTypes['MediaType']>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  bookmarkPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationbookmarkPostArgs, 'input'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationcreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationcreatePostArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteCommentArgs, 'commentId'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeletePostArgs, 'postId'>>;
  followUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationfollowUserArgs, 'input'>>;
  incrementPostView?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationincrementPostViewArgs, 'postId'>>;
  likeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationlikeCommentArgs, 'input'>>;
  likePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationlikePostArgs, 'input'>>;
  unbookmarkPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationunbookmarkPostArgs, 'input'>>;
  unfollowUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationunfollowUserArgs, 'input'>>;
  unlikeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationunlikeCommentArgs, 'input'>>;
  unlikePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationunlikePostArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationupdatePostArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  bookmarkCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<ResolversTypes['MediaAttachment']>>, ParentType, ContextType>;
  quoteOf?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  replyTo?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['VisibilitySetting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryactiveUsersArgs>>;
  allPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  commentsByPost?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerycommentsByPostArgs, 'postId'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUsersArgs, 'prefix'>>;
  popularPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerypopularPostsArgs>>;
  popularUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerypopularUsersArgs>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostArgs, 'id'>>;
  postsByAuthor?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostsByAuthorArgs, 'author'>>;
  recentPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryrecentPostsArgs>>;
  recentUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryrecentUsersArgs>>;
  repliesByComment?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryrepliesByCommentArgs, 'commentId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'address'>>;
};

export type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = {
  platform?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bookmarks?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  bookmarksCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  coverPicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  following?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publications?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  publicationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  socialLinks?: Resolver<Maybe<Array<Maybe<ResolversTypes['SocialLink']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingResolvers = EnumResolverSignature<{ FOLLOWERS_ONLY?: any, PRIVATE?: any, PUBLIC?: any }, ResolversTypes['VisibilitySetting']>;

export type Resolvers<ContextType = any> = {
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  MediaType?: MediaTypeResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SocialLink?: SocialLinkResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
