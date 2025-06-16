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

export type BookmarkInput = {
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
  cid: Scalars['String']['input'];
  description: Scalars['String']['input'];
  media: Array<MediaAttachmentInput>;
  title: Scalars['String']['input'];
  visibility: VisibilitySetting;
};

export type EventLog = {
  __typename?: 'EventLog';
  amount?: Maybe<Scalars['Int']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Timestamp']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  progress?: Maybe<Scalars['Int']['output']>;
  targetId?: Maybe<Scalars['String']['output']>;
  targetType?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type ExecutionRule = {
  __typename?: 'ExecutionRule';
  cooldownSec?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
};

export type ExecutionRuleInput = {
  cooldownSec?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type FilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type FollowInput = {
  targetAddress: Scalars['String']['input'];
};

export type GameConfig = {
  __typename?: 'GameConfig';
  cooldownSec: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lockedUntilRank: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type GuessMoviePayload = {
  __typename?: 'GuessMoviePayload';
  imageBlurUrl: Scalars['String']['output'];
  nonce: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  sessionId: Scalars['String']['output'];
};

export type GuessMovieResult = {
  __typename?: 'GuessMovieResult';
  attemptsLeft: Scalars['Int']['output'];
  correct: Scalars['Boolean']['output'];
  finished: Scalars['Boolean']['output'];
  xpAwarded: Scalars['Int']['output'];
};

export type LikeInput = {
  targetId: Scalars['String']['input'];
  targetType: TargetType;
};

export type LogEventInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetType?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
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
  claimPerk: Scalars['Boolean']['output'];
  createComment: Comment;
  createPerk: Perk;
  createPost: Post;
  createRank: Rank;
  createUser: User;
  deletePerk: Scalars['Boolean']['output'];
  deleteRank: Scalars['Boolean']['output'];
  hideComment?: Maybe<Scalars['Boolean']['output']>;
  hidePost?: Maybe<Scalars['Boolean']['output']>;
  incrementPostView: Post;
  logAnonymousEvent: Scalars['Boolean']['output'];
  logEvent: Scalars['Boolean']['output'];
  spinDailyWheel: SpinResult;
  startGuessMovie: GuessMoviePayload;
  startTrivia: TriviaQuestion;
  submitGuessMovie: GuessMovieResult;
  submitTriviaAnswer: TriviaAnswer;
  toggleBookmark: Scalars['Boolean']['output'];
  toggleFollow: Scalars['Boolean']['output'];
  toggleLike: Scalars['Boolean']['output'];
  updateComment: Comment;
  updatePerk: Perk;
  updatePost: Post;
  updateRank: Rank;
  updateUser: User;
};


export type MutationclaimPerkArgs = {
  perkId: Scalars['ID']['input'];
};


export type MutationcreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationcreatePerkArgs = {
  input: PerkCatalogInput;
};


export type MutationcreatePostArgs = {
  input: CreatePostInput;
};


export type MutationcreateRankArgs = {
  input: RankInput;
};


export type MutationcreateUserArgs = {
  input: UserInput;
};


export type MutationdeletePerkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationdeleteRankArgs = {
  id: Scalars['ID']['input'];
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


export type MutationlogAnonymousEventArgs = {
  input: LogEventInput;
};


export type MutationlogEventArgs = {
  input: LogEventInput;
};


export type MutationstartTriviaArgs = {
  difficulty?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsubmitGuessMovieArgs = {
  answerIndex: Scalars['Int']['input'];
  sessionId: Scalars['ID']['input'];
};


export type MutationsubmitTriviaAnswerArgs = {
  answerIndex: Scalars['Int']['input'];
  questionId: Scalars['ID']['input'];
  sessionId: Scalars['ID']['input'];
};


export type MutationtoggleBookmarkArgs = {
  input: BookmarkInput;
};


export type MutationtoggleFollowArgs = {
  input: FollowInput;
};


export type MutationtoggleLikeArgs = {
  input: LikeInput;
};


export type MutationupdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationupdatePerkArgs = {
  id: Scalars['ID']['input'];
  patch: PerkCatalogInput;
};


export type MutationupdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationupdateRankArgs = {
  id: Scalars['ID']['input'];
  patch: RankInput;
};


export type MutationupdateUserArgs = {
  input: UpdateUserInput;
};

export type Perk = {
  __typename?: 'Perk';
  availableAt?: Maybe<Scalars['Timestamp']['output']>;
  category: PerkCategory;
  collectedAt?: Maybe<Scalars['Timestamp']['output']>;
  cooldownRemaining: Scalars['Int']['output'];
  enabled: Scalars['Boolean']['output'];
  executionRule: ExecutionRule;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reward: Reward;
  rewardPreview: Scalars['String']['output'];
  uiHint?: Maybe<Scalars['String']['output']>;
  unlockRule: UnlockRule;
};

export type PerkCatalogInput = {
  category: PerkCategory;
  enabled: Scalars['Boolean']['input'];
  executionRule: ExecutionRuleInput;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  reward: RewardInput;
  uiHint?: InputMaybe<Scalars['String']['input']>;
  unlockRule: UnlockRuleInput;
};

export type PerkCategory =
  | 'ACCESS'
  | 'ECONOMY'
  | 'GAMIFICATION'
  | 'SOCIAL';

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
  getAchievements: UserAchievements;
  getActiveUsers: Array<User>;
  getAllPosts: Array<Post>;
  getBookmarksByPost: Array<User>;
  getBookmarksByUser: Array<Post>;
  getCommentsByPost: Array<Comment>;
  getGamesAvailable: Array<GameConfig>;
  getIsBookmarked: Scalars['Boolean']['output'];
  getIsFollowing: Scalars['Boolean']['output'];
  getIsLiked: Scalars['Boolean']['output'];
  getPopularPosts: Array<Post>;
  getPopularUsers: Array<User>;
  getPost?: Maybe<Post>;
  getPostViews: Scalars['Int']['output'];
  getPosts: Array<Post>;
  getPostsByAuthor: Array<Post>;
  getProfileViews: Scalars['Int']['output'];
  getRanksCatalog: Array<Rank>;
  getRecentPosts: Array<Post>;
  getRecentUsers: Array<User>;
  getRepliesByComment: Array<Comment>;
  getTargetEvents: Array<EventLog>;
  getUnlockedPerks: Array<Perk>;
  getUser?: Maybe<User>;
  getUserBookmarks: Array<Post>;
  getUserEvents: Array<EventLog>;
  getUserFollowers: Array<User>;
  getUserFollowing: Array<User>;
  getUserXPHistory: Array<XPEntry>;
  getUsers: Array<User>;
};


export type QuerygetAchievementsArgs = {
  address: Scalars['String']['input'];
};


export type QuerygetActiveUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetAllPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetBookmarksByPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['String']['input'];
};


export type QuerygetBookmarksByUserArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetCommentsByPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['String']['input'];
};


export type QuerygetGamesAvailableArgs = {
  address: Scalars['String']['input'];
};


export type QuerygetIsBookmarkedArgs = {
  postId: Scalars['String']['input'];
};


export type QuerygetIsFollowingArgs = {
  targetAddress: Scalars['String']['input'];
};


export type QuerygetIsLikedArgs = {
  targetId: Scalars['String']['input'];
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


export type QuerygetPostViewsArgs = {
  postId: Scalars['String']['input'];
};


export type QuerygetPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerygetPostsByAuthorArgs = {
  author: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetProfileViewsArgs = {
  address: Scalars['String']['input'];
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


export type QuerygetTargetEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  targetId: Scalars['String']['input'];
  targetType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QuerygetUnlockedPerksArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserArgs = {
  input: UserByInput;
};


export type QuerygetUserBookmarksArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerygetUserEventsArgs = {
  address: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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

export type Rank = {
  __typename?: 'Rank';
  badgeUrl: Scalars['String']['output'];
  colorTheme: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['String']['output'];
  minXp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type RankInput = {
  badgeUrl: Scalars['String']['input'];
  colorTheme: Scalars['String']['input'];
  id: Scalars['String']['input'];
  minXp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Reward = {
  __typename?: 'Reward';
  action: Scalars['String']['output'];
  amount?: Maybe<Scalars['Int']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type RewardInput = {
  action: Scalars['String']['input'];
  amount?: InputMaybe<Scalars['Int']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
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

export type SpinResult = {
  __typename?: 'SpinResult';
  cooldownUntil: Scalars['Timestamp']['output'];
  emoji: Scalars['String']['output'];
  label: Scalars['String']['output'];
  outcomeId: Scalars['String']['output'];
  rewardApplied: Scalars['Boolean']['output'];
};

export type TargetType =
  | 'COMMENT'
  | 'POST';

export type TriviaAnswer = {
  __typename?: 'TriviaAnswer';
  correct: Scalars['Boolean']['output'];
  finished: Scalars['Boolean']['output'];
  nextQuestion?: Maybe<TriviaQuestion>;
  xpAwarded: Scalars['Int']['output'];
};

export type TriviaQuestion = {
  __typename?: 'TriviaQuestion';
  image?: Maybe<Scalars['String']['output']>;
  nonce: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  questionId: Scalars['String']['output'];
  sessionId: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type UnlockRule = {
  __typename?: 'UnlockRule';
  action?: Maybe<Scalars['String']['output']>;
  on: Scalars['String']['output'];
  rankId?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Scalars['Int']['output']>;
  window?: Maybe<Scalars['String']['output']>;
};

export type UnlockRuleInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  on: Scalars['String']['input'];
  rankId?: InputMaybe<Scalars['String']['input']>;
  times?: InputMaybe<Scalars['Int']['input']>;
  window?: InputMaybe<Scalars['String']['input']>;
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
  xpTotal: Scalars['Int']['output'];
};

export type UserAchievements = {
  __typename?: 'UserAchievements';
  currentRank: Rank;
  nextRank?: Maybe<Rank>;
  progressPct: Scalars['Float']['output'];
  xpBalance: Scalars['Int']['output'];
  xpRemaining: Scalars['Int']['output'];
  xpTotal: Scalars['Int']['output'];
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
  totalAfter: Scalars['Int']['output'];
  user: Scalars['String']['output'];
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
  BookmarkInput: BookmarkInput;
  CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'parentComment' | 'post'> & { parentComment?: Maybe<ResolversTypes['Comment']>, post: ResolversTypes['Post'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EventLog: ResolverTypeWrapper<EventLog>;
  ExecutionRule: ResolverTypeWrapper<ExecutionRule>;
  ExecutionRuleInput: ExecutionRuleInput;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  GameConfig: ResolverTypeWrapper<GameConfig>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  GuessMoviePayload: ResolverTypeWrapper<GuessMoviePayload>;
  GuessMovieResult: ResolverTypeWrapper<GuessMovieResult>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LikeInput: LikeInput;
  LogEventInput: LogEventInput;
  MediaAttachment: ResolverTypeWrapper<MediaAttachment>;
  MediaAttachmentInput: MediaAttachmentInput;
  Mutation: ResolverTypeWrapper<{}>;
  Perk: ResolverTypeWrapper<Omit<Perk, 'category'> & { category: ResolversTypes['PerkCategory'] }>;
  PerkCatalogInput: PerkCatalogInput;
  PerkCategory: ResolverTypeWrapper<'GAMIFICATION' | 'ECONOMY' | 'SOCIAL' | 'ACCESS'>;
  Post: ResolverTypeWrapper<Omit<Post, 'visibility'> & { visibility: ResolversTypes['VisibilitySetting'] }>;
  Query: ResolverTypeWrapper<{}>;
  Rank: ResolverTypeWrapper<Rank>;
  RankInput: RankInput;
  Reward: ResolverTypeWrapper<Reward>;
  RewardInput: RewardInput;
  SocialLink: ResolverTypeWrapper<SocialLink>;
  SocialLinkInput: SocialLinkInput;
  SpinResult: ResolverTypeWrapper<SpinResult>;
  TargetType: ResolverTypeWrapper<'POST' | 'COMMENT'>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TriviaAnswer: ResolverTypeWrapper<TriviaAnswer>;
  TriviaQuestion: ResolverTypeWrapper<TriviaQuestion>;
  UnlockRule: ResolverTypeWrapper<UnlockRule>;
  UnlockRuleInput: UnlockRuleInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserAchievements: ResolverTypeWrapper<UserAchievements>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  UserByInput: UserByInput;
  UserInput: UserInput;
  VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
  XPEntry: ResolverTypeWrapper<XPEntry>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddXPInput: AddXPInput;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  BookmarkInput: BookmarkInput;
  Comment: Omit<Comment, 'parentComment' | 'post'> & { parentComment?: Maybe<ResolversParentTypes['Comment']>, post: ResolversParentTypes['Post'] };
  Boolean: Scalars['Boolean']['output'];
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EventLog: EventLog;
  ExecutionRule: ExecutionRule;
  ExecutionRuleInput: ExecutionRuleInput;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  GameConfig: GameConfig;
  ID: Scalars['ID']['output'];
  GuessMoviePayload: GuessMoviePayload;
  GuessMovieResult: GuessMovieResult;
  JSON: Scalars['JSON']['output'];
  LikeInput: LikeInput;
  LogEventInput: LogEventInput;
  MediaAttachment: MediaAttachment;
  MediaAttachmentInput: MediaAttachmentInput;
  Mutation: {};
  Perk: Perk;
  PerkCatalogInput: PerkCatalogInput;
  Post: Post;
  Query: {};
  Rank: Rank;
  RankInput: RankInput;
  Reward: Reward;
  RewardInput: RewardInput;
  SocialLink: SocialLink;
  SocialLinkInput: SocialLinkInput;
  SpinResult: SpinResult;
  Timestamp: Scalars['Timestamp']['output'];
  TriviaAnswer: TriviaAnswer;
  TriviaQuestion: TriviaQuestion;
  UnlockRule: UnlockRule;
  UnlockRuleInput: UnlockRuleInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserAchievements: UserAchievements;
  Float: Scalars['Float']['output'];
  UserByInput: UserByInput;
  UserInput: UserInput;
  XPEntry: XPEntry;
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

export type EventLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventLog'] = ResolversParentTypes['EventLog']> = {
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExecutionRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExecutionRule'] = ResolversParentTypes['ExecutionRule']> = {
  cooldownSec?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameConfigResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameConfig'] = ResolversParentTypes['GameConfig']> = {
  cooldownSec?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lockedUntilRank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuessMoviePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuessMoviePayload'] = ResolversParentTypes['GuessMoviePayload']> = {
  imageBlurUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuessMovieResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuessMovieResult'] = ResolversParentTypes['GuessMovieResult']> = {
  attemptsLeft?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  correct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  xpAwarded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  claimPerk?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationclaimPerkArgs, 'perkId'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationcreateCommentArgs, 'input'>>;
  createPerk?: Resolver<ResolversTypes['Perk'], ParentType, ContextType, RequireFields<MutationcreatePerkArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationcreatePostArgs, 'input'>>;
  createRank?: Resolver<ResolversTypes['Rank'], ParentType, ContextType, RequireFields<MutationcreateRankArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  deletePerk?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeletePerkArgs, 'id'>>;
  deleteRank?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteRankArgs, 'id'>>;
  hideComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationhideCommentArgs, 'commentId'>>;
  hidePost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationhidePostArgs, 'postId'>>;
  incrementPostView?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationincrementPostViewArgs, 'postId'>>;
  logAnonymousEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationlogAnonymousEventArgs, 'input'>>;
  logEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationlogEventArgs, 'input'>>;
  spinDailyWheel?: Resolver<ResolversTypes['SpinResult'], ParentType, ContextType>;
  startGuessMovie?: Resolver<ResolversTypes['GuessMoviePayload'], ParentType, ContextType>;
  startTrivia?: Resolver<ResolversTypes['TriviaQuestion'], ParentType, ContextType, RequireFields<MutationstartTriviaArgs, 'difficulty'>>;
  submitGuessMovie?: Resolver<ResolversTypes['GuessMovieResult'], ParentType, ContextType, RequireFields<MutationsubmitGuessMovieArgs, 'answerIndex' | 'sessionId'>>;
  submitTriviaAnswer?: Resolver<ResolversTypes['TriviaAnswer'], ParentType, ContextType, RequireFields<MutationsubmitTriviaAnswerArgs, 'answerIndex' | 'questionId' | 'sessionId'>>;
  toggleBookmark?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleBookmarkArgs, 'input'>>;
  toggleFollow?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleFollowArgs, 'input'>>;
  toggleLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationtoggleLikeArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'input'>>;
  updatePerk?: Resolver<ResolversTypes['Perk'], ParentType, ContextType, RequireFields<MutationupdatePerkArgs, 'id' | 'patch'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationupdatePostArgs, 'input'>>;
  updateRank?: Resolver<ResolversTypes['Rank'], ParentType, ContextType, RequireFields<MutationupdateRankArgs, 'id' | 'patch'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
};

export type PerkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Perk'] = ResolversParentTypes['Perk']> = {
  availableAt?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['PerkCategory'], ParentType, ContextType>;
  collectedAt?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  cooldownRemaining?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  executionRule?: Resolver<ResolversTypes['ExecutionRule'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['Reward'], ParentType, ContextType>;
  rewardPreview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uiHint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unlockRule?: Resolver<ResolversTypes['UnlockRule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerkCategoryResolvers = EnumResolverSignature<{ ACCESS?: any, ECONOMY?: any, GAMIFICATION?: any, SOCIAL?: any }, ResolversTypes['PerkCategory']>;

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
  getAchievements?: Resolver<ResolversTypes['UserAchievements'], ParentType, ContextType, RequireFields<QuerygetAchievementsArgs, 'address'>>;
  getActiveUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetActiveUsersArgs>>;
  getAllPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetAllPostsArgs>>;
  getBookmarksByPost?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetBookmarksByPostArgs, 'limit' | 'postId'>>;
  getBookmarksByUser?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetBookmarksByUserArgs, 'address' | 'limit'>>;
  getCommentsByPost?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetCommentsByPostArgs, 'postId'>>;
  getGamesAvailable?: Resolver<Array<ResolversTypes['GameConfig']>, ParentType, ContextType, RequireFields<QuerygetGamesAvailableArgs, 'address'>>;
  getIsBookmarked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsBookmarkedArgs, 'postId'>>;
  getIsFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsFollowingArgs, 'targetAddress'>>;
  getIsLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerygetIsLikedArgs, 'targetId'>>;
  getPopularPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetPopularPostsArgs>>;
  getPopularUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetPopularUsersArgs>>;
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostArgs, 'id'>>;
  getPostViews?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QuerygetPostViewsArgs, 'postId'>>;
  getPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsArgs, 'query'>>;
  getPostsByAuthor?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsByAuthorArgs, 'author'>>;
  getProfileViews?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QuerygetProfileViewsArgs, 'address'>>;
  getRanksCatalog?: Resolver<Array<ResolversTypes['Rank']>, ParentType, ContextType>;
  getRecentPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, Partial<QuerygetRecentPostsArgs>>;
  getRecentUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerygetRecentUsersArgs>>;
  getRepliesByComment?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetRepliesByCommentArgs, 'commentId'>>;
  getTargetEvents?: Resolver<Array<ResolversTypes['EventLog']>, ParentType, ContextType, RequireFields<QuerygetTargetEventsArgs, 'limit' | 'offset' | 'targetId'>>;
  getUnlockedPerks?: Resolver<Array<ResolversTypes['Perk']>, ParentType, ContextType, RequireFields<QuerygetUnlockedPerksArgs, 'address' | 'limit' | 'offset'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserArgs, 'input'>>;
  getUserBookmarks?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetUserBookmarksArgs, 'address'>>;
  getUserEvents?: Resolver<Array<ResolversTypes['EventLog']>, ParentType, ContextType, RequireFields<QuerygetUserEventsArgs, 'address' | 'limit' | 'offset'>>;
  getUserFollowers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowersArgs, 'address'>>;
  getUserFollowing?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowingArgs, 'address'>>;
  getUserXPHistory?: Resolver<Array<ResolversTypes['XPEntry']>, ParentType, ContextType, RequireFields<QuerygetUserXPHistoryArgs, 'address' | 'limit' | 'offset'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUsersArgs, 'query'>>;
};

export type RankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rank'] = ResolversParentTypes['Rank']> = {
  badgeUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorTheme?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minXp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RewardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reward'] = ResolversParentTypes['Reward']> = {
  action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tokenId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = {
  platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpinResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpinResult'] = ResolversParentTypes['SpinResult']> = {
  cooldownUntil?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outcomeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rewardApplied?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TargetTypeResolvers = EnumResolverSignature<{ COMMENT?: any, POST?: any }, ResolversTypes['TargetType']>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TriviaAnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['TriviaAnswer'] = ResolversParentTypes['TriviaAnswer']> = {
  correct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nextQuestion?: Resolver<Maybe<ResolversTypes['TriviaQuestion']>, ParentType, ContextType>;
  xpAwarded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TriviaQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TriviaQuestion'] = ResolversParentTypes['TriviaQuestion']> = {
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlockRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlockRule'] = ResolversParentTypes['UnlockRule']> = {
  action?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  on?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rankId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  times?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  window?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  xpTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAchievementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAchievements'] = ResolversParentTypes['UserAchievements']> = {
  currentRank?: Resolver<ResolversTypes['Rank'], ParentType, ContextType>;
  nextRank?: Resolver<Maybe<ResolversTypes['Rank']>, ParentType, ContextType>;
  progressPct?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  xpBalance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  xpRemaining?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  xpTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  totalAfter?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EventLog?: EventLogResolvers<ContextType>;
  ExecutionRule?: ExecutionRuleResolvers<ContextType>;
  GameConfig?: GameConfigResolvers<ContextType>;
  GuessMoviePayload?: GuessMoviePayloadResolvers<ContextType>;
  GuessMovieResult?: GuessMovieResultResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Perk?: PerkResolvers<ContextType>;
  PerkCategory?: PerkCategoryResolvers;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rank?: RankResolvers<ContextType>;
  Reward?: RewardResolvers<ContextType>;
  SocialLink?: SocialLinkResolvers<ContextType>;
  SpinResult?: SpinResultResolvers<ContextType>;
  TargetType?: TargetTypeResolvers;
  Timestamp?: GraphQLScalarType;
  TriviaAnswer?: TriviaAnswerResolvers<ContextType>;
  TriviaQuestion?: TriviaQuestionResolvers<ContextType>;
  UnlockRule?: UnlockRuleResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAchievements?: UserAchievementsResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
  XPEntry?: XPEntryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
