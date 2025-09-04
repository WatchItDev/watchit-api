import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: Date | string; output: Date | string };
  /** ISO-8601 Date-Time string (e.g. 2024-04-17T15:22:00.000Z) */
  DateTime: { input: Date | string; output: Date | string };
  JSON: { input: any; output: any };
  /** Unix epoch in milliseconds (number). */
  Timestamp: { input: Date | string | number; output: Date | string | number };
  Upload: { input: any; output: any };
};

export type Actor = "OWNER" | "SELF" | "TARGET";

export type AddXPInput = {
  action: Scalars["String"]["input"];
  address: Scalars["String"]["input"];
  amount: Scalars["Int"]["input"];
  description: Scalars["String"]["input"];
};

export type AgentInput = {
  message: Scalars["String"]["input"];
};

export type AgentOutput = {
  __typename?: "AgentOutput";
  done?: Maybe<Scalars["Boolean"]["output"]>;
  message?: Maybe<Message>;
};

export type BookmarkInput = {
  postId: Scalars["String"]["input"];
};

export type CacheControlScope = "PRIVATE" | "PUBLIC";

/** A comment on a post, or a reply to another comment. */
export type Comment = {
  __typename?: "Comment";
  author: User;
  content: Scalars["String"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  hidden: Scalars["Boolean"]["output"];
  id: Scalars["String"]["output"];
  likeCount: Scalars["Int"]["output"];
  parentComment?: Maybe<Comment>;
  post: Post;
  repliesCount: Scalars["Int"]["output"];
  updatedAt: Scalars["Timestamp"]["output"];
};

export type CreateCommentInput = {
  content: Scalars["String"]["input"];
  parentComment?: InputMaybe<Scalars["String"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type CreatePostInput = {
  cid: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  media: Array<MediaAttachmentInput>;
  title: Scalars["String"]["input"];
  visibility: VisibilitySetting;
};

export type CreateTipInput = {
  amount: Scalars["Float"]["input"];
  creator: Scalars["String"]["input"];
  message?: InputMaybe<Scalars["String"]["input"]>;
  postId: Scalars["String"]["input"];
  txHash?: InputMaybe<Scalars["String"]["input"]>;
};

export type DistinctBy = "NONE" | "TARGET" | "USER";

export type EventLog = {
  __typename?: "EventLog";
  amount?: Maybe<Scalars["Int"]["output"]>;
  author?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["Timestamp"]["output"];
  currency?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  meta?: Maybe<Scalars["JSON"]["output"]>;
  progress?: Maybe<Scalars["Int"]["output"]>;
  targetId?: Maybe<Scalars["String"]["output"]>;
  targetType?: Maybe<Scalars["String"]["output"]>;
  type: Scalars["String"]["output"];
};

export type ExecutionRule = {
  __typename?: "ExecutionRule";
  cooldownSec: Scalars["Int"]["output"];
  type: Scalars["String"]["output"];
};

export type ExecutionRuleInput = {
  cooldownSec: Scalars["Int"]["input"];
  type: Scalars["String"]["input"];
};

export type FilterInput = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type FollowInput = {
  targetAddress: Scalars["String"]["input"];
};

export type LikeInput = {
  targetId: Scalars["String"]["input"];
  targetType: TargetType;
};

export type LogEventInput = {
  amount?: InputMaybe<Scalars["Int"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  meta?: InputMaybe<Scalars["JSON"]["input"]>;
  progress?: InputMaybe<Scalars["Int"]["input"]>;
  targetId?: InputMaybe<Scalars["String"]["input"]>;
  targetType?: InputMaybe<Scalars["String"]["input"]>;
  type: Scalars["String"]["input"];
};

export type MediaAttachment = {
  __typename?: "MediaAttachment";
  cid: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  title?: Maybe<Scalars["String"]["output"]>;
  type: Scalars["String"]["output"];
  url?: Maybe<Scalars["String"]["output"]>;
};

export type MediaAttachmentInput = {
  cid: Scalars["String"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  type: Scalars["String"]["input"];
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type Message = {
  __typename?: "Message";
  content: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  claimPerk: Scalars["Boolean"]["output"];
  createComment: Comment;
  createPerk: Perk;
  createPost: Post;
  createRank: Rank;
  createTip: Tip;
  createUser: User;
  deletePerk: Scalars["Boolean"]["output"];
  deleteRank: Scalars["Boolean"]["output"];
  hideComment?: Maybe<Scalars["Boolean"]["output"]>;
  hidePost?: Maybe<Scalars["Boolean"]["output"]>;
  humanMessage?: Maybe<Message>;
  incrementPostView: Post;
  logAnonymousEvent: Scalars["Boolean"]["output"];
  logEvent: Scalars["Boolean"]["output"];
  toggleBookmark: Scalars["Boolean"]["output"];
  toggleFollow: Scalars["Boolean"]["output"];
  toggleLike: Scalars["Boolean"]["output"];
  updateComment: Comment;
  updatePerk: Perk;
  updatePost: Post;
  updateRank: Rank;
  updateUser: User;
};

export type MutationclaimPerkArgs = {
  perkId: Scalars["ID"]["input"];
};

export type MutationcreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationcreatePerkArgs = {
  input: PerkInput;
};

export type MutationcreatePostArgs = {
  input: CreatePostInput;
};

export type MutationcreateRankArgs = {
  input: RankInput;
};

export type MutationcreateTipArgs = {
  input: CreateTipInput;
};

export type MutationcreateUserArgs = {
  input: UserInput;
};

export type MutationdeletePerkArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationdeleteRankArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationhideCommentArgs = {
  commentId: Scalars["String"]["input"];
};

export type MutationhidePostArgs = {
  postId: Scalars["String"]["input"];
};

export type MutationhumanMessageArgs = {
  input: AgentInput;
};

export type MutationincrementPostViewArgs = {
  postId: Scalars["String"]["input"];
};

export type MutationlogAnonymousEventArgs = {
  input: LogEventInput;
};

export type MutationlogEventArgs = {
  input: LogEventInput;
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
  id: Scalars["ID"]["input"];
  patch: PerkInput;
};

export type MutationupdatePostArgs = {
  input: UpdatePostInput;
};

export type MutationupdateRankArgs = {
  id: Scalars["ID"]["input"];
  patch: RankInput;
};

export type MutationupdateUserArgs = {
  input: UpdateUserInput;
};

export type Perk = {
  __typename?: "Perk";
  availableAt?: Maybe<Scalars["Timestamp"]["output"]>;
  category: PerkCategory;
  collectedAt?: Maybe<Scalars["Timestamp"]["output"]>;
  cooldownRemaining: Scalars["Int"]["output"];
  enabled: Scalars["Boolean"]["output"];
  executionRule: ExecutionRule;
  hooks?: Maybe<Array<Maybe<Scalars["JSON"]["output"]>>>;
  id: Scalars["String"]["output"];
  minRankId: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  reward: Reward;
  rewardPreview: Scalars["String"]["output"];
  uiHint?: Maybe<Scalars["String"]["output"]>;
  unlockRule: UnlockRule;
};

export type PerkCategory = "ACCESS" | "ECONOMY" | "GAMIFICATION" | "SOCIAL";

export type PerkInput = {
  category: PerkCategory;
  enabled: Scalars["Boolean"]["input"];
  executionRule: ExecutionRuleInput;
  hooks?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  id: Scalars["String"]["input"];
  minRankId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  reward: RewardInput;
  uiHint?: InputMaybe<Scalars["String"]["input"]>;
  unlockRule: UnlockRuleInput;
};

export type Post = {
  __typename?: "Post";
  author: User;
  bookmarkCount: Scalars["Int"]["output"];
  cid: Scalars["String"]["output"];
  commentCount: Scalars["Int"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  credits: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  hidden: Scalars["Boolean"]["output"];
  id: Scalars["String"]["output"];
  likeCount: Scalars["Int"]["output"];
  media: Array<MediaAttachment>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["Timestamp"]["output"];
  viewCount: Scalars["Int"]["output"];
  visibility: VisibilitySetting;
  year: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  getAchievements: UserAchievements;
  getActiveUsers: Array<User>;
  getAllPosts: Array<Post>;
  getBookmarksByPost: Array<User>;
  getBookmarksByUser: Array<Post>;
  getCommentsByPost: Array<Comment>;
  getCreatorTips: Array<Tip>;
  getIsBookmarked: Scalars["Boolean"]["output"];
  getIsFollowing: Scalars["Boolean"]["output"];
  getIsLiked: Scalars["Boolean"]["output"];
  getLeaderboard: Array<User>;
  getPerks: Array<Perk>;
  getPopularPosts: Array<Post>;
  getPopularUsers: Array<User>;
  getPost?: Maybe<Post>;
  getPostViews: Scalars["Int"]["output"];
  getPosts: Array<Post>;
  getPostsByAuthor: Array<Post>;
  getProfileViews: Scalars["Int"]["output"];
  getRanksCatalog: Array<Rank>;
  getRecentPosts: Array<Post>;
  getRecentUsers: Array<User>;
  getRepliesByComment: Array<Comment>;
  getTargetEvents: Array<EventLog>;
  getTipsByBakerForPost: Array<TipByBaker>;
  getTipsForPost: Array<Tip>;
  getUnlockedPerks: Array<UnlockedPerkState>;
  getUser?: Maybe<User>;
  getUserBookmarks: Array<Post>;
  getUserEvents: Array<EventLog>;
  getUserFollowers: Array<User>;
  getUserFollowing: Array<User>;
  getUserRanks: Array<UserRank>;
  getUserTipsHistory: Array<Tip>;
  getUserXPHistory: Array<XPEntry>;
  getUsers: Array<User>;
  hasPerk: Scalars["Boolean"]["output"];
};

export type QuerygetAchievementsArgs = {
  address: Scalars["String"]["input"];
};

export type QuerygetActiveUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetAllPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetBookmarksByPostArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type QuerygetBookmarksByUserArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetCommentsByPostArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type QuerygetCreatorTipsArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetIsBookmarkedArgs = {
  postId: Scalars["String"]["input"];
};

export type QuerygetIsFollowingArgs = {
  targetAddress: Scalars["String"]["input"];
};

export type QuerygetIsLikedArgs = {
  targetId: Scalars["String"]["input"];
};

export type QuerygetLeaderboardArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetPopularPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetPopularUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetPostArgs = {
  id: Scalars["String"]["input"];
};

export type QuerygetPostViewsArgs = {
  postId: Scalars["String"]["input"];
};

export type QuerygetPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  query: Scalars["String"]["input"];
};

export type QuerygetPostsByAuthorArgs = {
  author: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetProfileViewsArgs = {
  address: Scalars["String"]["input"];
};

export type QuerygetRecentPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetRecentUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetRepliesByCommentArgs = {
  commentId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetTargetEventsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  targetId: Scalars["String"]["input"];
  targetType?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerygetTipsByBakerForPostArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type QuerygetTipsForPostArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  postId: Scalars["String"]["input"];
};

export type QuerygetUnlockedPerksArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUserArgs = {
  input: UserByInput;
};

export type QuerygetUserBookmarksArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUserEventsArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerygetUserFollowersArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUserFollowingArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUserRanksArgs = {
  address: Scalars["String"]["input"];
};

export type QuerygetUserTipsHistoryArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUserXPHistoryArgs = {
  address: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerygetUsersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  query: Scalars["String"]["input"];
};

export type QueryhasPerkArgs = {
  address: Scalars["String"]["input"];
  perkId: Scalars["ID"]["input"];
};

export type Rank = {
  __typename?: "Rank";
  badgeUrl: Scalars["String"]["output"];
  colorTheme: Scalars["String"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  id: Scalars["String"]["output"];
  minXp: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
  updatedAt: Scalars["Timestamp"]["output"];
};

export type RankInput = {
  badgeUrl: Scalars["String"]["input"];
  colorTheme: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  minXp: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  order: Scalars["Int"]["input"];
};

export type Reward = {
  __typename?: "Reward";
  action: Scalars["String"]["output"];
  amount?: Maybe<Scalars["Int"]["output"]>;
  tokenId?: Maybe<Scalars["String"]["output"]>;
};

export type RewardInput = {
  action: Scalars["String"]["input"];
  amount?: InputMaybe<Scalars["Int"]["input"]>;
  tokenId?: InputMaybe<Scalars["String"]["input"]>;
};

export type SocialLink = {
  __typename?: "SocialLink";
  platform: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type SocialLinkInput = {
  platform: Scalars["String"]["input"];
  url: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  onAiMessage?: Maybe<AgentOutput>;
};

export type TargetType = "COMMENT" | "POST";

export type Tip = {
  __typename?: "Tip";
  amount: Scalars["Float"]["output"];
  baker: Scalars["String"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  creator: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  postId: Scalars["String"]["output"];
  txHash?: Maybe<Scalars["String"]["output"]>;
};

export type TipByBaker = {
  __typename?: "TipByBaker";
  baker: User;
  count: Scalars["Float"]["output"];
  lastTipAt: Scalars["Timestamp"]["output"];
  totalAmount: Scalars["Float"]["output"];
};

export type UnlockRule = {
  __typename?: "UnlockRule";
  action?: Maybe<Scalars["String"]["output"]>;
  actor?: Maybe<Actor>;
  distinctBy?: Maybe<DistinctBy>;
  on: Scalars["String"]["output"];
  rankId?: Maybe<Scalars["String"]["output"]>;
  times?: Maybe<Scalars["Int"]["output"]>;
  window?: Maybe<Scalars["String"]["output"]>;
};

export type UnlockRuleInput = {
  action?: InputMaybe<Scalars["String"]["input"]>;
  actor?: InputMaybe<Actor>;
  distinctBy?: InputMaybe<DistinctBy>;
  on: Scalars["String"]["input"];
  rankId?: InputMaybe<Scalars["String"]["input"]>;
  times?: InputMaybe<Scalars["Int"]["input"]>;
  window?: InputMaybe<Scalars["String"]["input"]>;
};

export type UnlockedPerkState = {
  __typename?: "UnlockedPerkState";
  availableAt: Scalars["Timestamp"]["output"];
  collectedAt?: Maybe<Scalars["Timestamp"]["output"]>;
  cooldownSec: Scalars["Int"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  id: Scalars["String"]["output"];
  perk: Perk;
  perkId: Scalars["String"]["output"];
  progress: Scalars["Int"]["output"];
  status: Scalars["String"]["output"];
  target: Scalars["Int"]["output"];
  user: Scalars["String"]["output"];
};

export type UpdateCommentInput = {
  commentId: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
};

export type UpdatePostInput = {
  cid?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  media?: InputMaybe<Array<MediaAttachmentInput>>;
  postId: Scalars["String"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  visibility?: InputMaybe<VisibilitySetting>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  coverPicture?: InputMaybe<Scalars["String"]["input"]>;
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  profilePicture?: InputMaybe<Scalars["String"]["input"]>;
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  address: Scalars["String"]["output"];
  bio: Scalars["String"]["output"];
  bookmarksCount: Scalars["Int"]["output"];
  coverPicture: Scalars["String"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  currentRank: Scalars["String"]["output"];
  displayName: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  followersCount: Scalars["Int"]["output"];
  followingCount: Scalars["Int"]["output"];
  id: Scalars["String"]["output"];
  profilePicture: Scalars["String"]["output"];
  publicationsCount: Scalars["Int"]["output"];
  socialLinks?: Maybe<Array<SocialLink>>;
  updatedAt: Scalars["Timestamp"]["output"];
  username: Scalars["String"]["output"];
  verified: Scalars["Boolean"]["output"];
  xpBalance: Scalars["Int"]["output"];
  xpTotal: Scalars["Int"]["output"];
};

export type UserAchievements = {
  __typename?: "UserAchievements";
  currentRank: Rank;
  nextRank?: Maybe<Rank>;
  progressPct: Scalars["Float"]["output"];
  xpBalance: Scalars["Int"]["output"];
  xpRemaining: Scalars["Int"]["output"];
  xpTotal: Scalars["Int"]["output"];
};

export type UserByInput = {
  address: Scalars["String"]["input"];
  idSession?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserInput = {
  address: Scalars["String"]["input"];
  bio: Scalars["String"]["input"];
  coverPicture?: InputMaybe<Scalars["String"]["input"]>;
  displayName: Scalars["String"]["input"];
  profilePicture?: InputMaybe<Scalars["String"]["input"]>;
  socialLinks?: InputMaybe<Array<SocialLinkInput>>;
  username: Scalars["String"]["input"];
};

export type UserRank = {
  __typename?: "UserRank";
  achievedAt: Scalars["Timestamp"]["output"];
  rankId: Scalars["String"]["output"];
  user: Scalars["String"]["output"];
};

export type VisibilitySetting = "FOLLOWERS_ONLY" | "PRIVATE" | "PUBLIC";

export type XPEntry = {
  __typename?: "XPEntry";
  action: Scalars["String"]["output"];
  amount: Scalars["Int"]["output"];
  balanceAfter: Scalars["Int"]["output"];
  balanceBefore: Scalars["Int"]["output"];
  createdAt: Scalars["Timestamp"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  totalAfter: Scalars["Int"]["output"];
  user: Scalars["String"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Actor: ResolverTypeWrapper<"SELF" | "TARGET" | "OWNER">;
  AddXPInput: AddXPInput;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  AgentInput: AgentInput;
  AgentOutput: ResolverTypeWrapper<AgentOutput>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  BookmarkInput: BookmarkInput;
  CacheControlScope: ResolverTypeWrapper<"PUBLIC" | "PRIVATE">;
  Comment: ResolverTypeWrapper<
    Omit<Comment, "parentComment" | "post"> & {
      parentComment?: Maybe<ResolversTypes["Comment"]>;
      post: ResolversTypes["Post"];
    }
  >;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateTipInput: CreateTipInput;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  DistinctBy: ResolverTypeWrapper<"NONE" | "TARGET" | "USER">;
  EventLog: ResolverTypeWrapper<EventLog>;
  ExecutionRule: ResolverTypeWrapper<ExecutionRule>;
  ExecutionRuleInput: ExecutionRuleInput;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  JSON: ResolverTypeWrapper<Scalars["JSON"]["output"]>;
  LikeInput: LikeInput;
  LogEventInput: LogEventInput;
  MediaAttachment: ResolverTypeWrapper<MediaAttachment>;
  MediaAttachmentInput: MediaAttachmentInput;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Perk: ResolverTypeWrapper<
    Omit<Perk, "category" | "unlockRule"> & {
      category: ResolversTypes["PerkCategory"];
      unlockRule: ResolversTypes["UnlockRule"];
    }
  >;
  PerkCategory: ResolverTypeWrapper<
    "GAMIFICATION" | "ECONOMY" | "SOCIAL" | "ACCESS"
  >;
  PerkInput: PerkInput;
  Post: ResolverTypeWrapper<
    Omit<Post, "visibility"> & {
      visibility: ResolversTypes["VisibilitySetting"];
    }
  >;
  Query: ResolverTypeWrapper<{}>;
  Rank: ResolverTypeWrapper<Rank>;
  RankInput: RankInput;
  Reward: ResolverTypeWrapper<Reward>;
  RewardInput: RewardInput;
  SocialLink: ResolverTypeWrapper<SocialLink>;
  SocialLinkInput: SocialLinkInput;
  Subscription: ResolverTypeWrapper<{}>;
  TargetType: ResolverTypeWrapper<"POST" | "COMMENT">;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]["output"]>;
  Tip: ResolverTypeWrapper<Tip>;
  TipByBaker: ResolverTypeWrapper<TipByBaker>;
  UnlockRule: ResolverTypeWrapper<
    Omit<UnlockRule, "actor" | "distinctBy"> & {
      actor?: Maybe<ResolversTypes["Actor"]>;
      distinctBy?: Maybe<ResolversTypes["DistinctBy"]>;
    }
  >;
  UnlockRuleInput: UnlockRuleInput;
  UnlockedPerkState: ResolverTypeWrapper<
    Omit<UnlockedPerkState, "perk"> & { perk: ResolversTypes["Perk"] }
  >;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: ResolverTypeWrapper<Scalars["Upload"]["output"]>;
  User: ResolverTypeWrapper<User>;
  UserAchievements: ResolverTypeWrapper<UserAchievements>;
  UserByInput: UserByInput;
  UserInput: UserInput;
  UserRank: ResolverTypeWrapper<UserRank>;
  VisibilitySetting: ResolverTypeWrapper<
    "PUBLIC" | "FOLLOWERS_ONLY" | "PRIVATE"
  >;
  XPEntry: ResolverTypeWrapper<XPEntry>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddXPInput: AddXPInput;
  String: Scalars["String"]["output"];
  Int: Scalars["Int"]["output"];
  AgentInput: AgentInput;
  AgentOutput: AgentOutput;
  Boolean: Scalars["Boolean"]["output"];
  BookmarkInput: BookmarkInput;
  Comment: Omit<Comment, "parentComment" | "post"> & {
    parentComment?: Maybe<ResolversParentTypes["Comment"]>;
    post: ResolversParentTypes["Post"];
  };
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateTipInput: CreateTipInput;
  Float: Scalars["Float"]["output"];
  Date: Scalars["Date"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  EventLog: EventLog;
  ExecutionRule: ExecutionRule;
  ExecutionRuleInput: ExecutionRuleInput;
  FilterInput: FilterInput;
  FollowInput: FollowInput;
  JSON: Scalars["JSON"]["output"];
  LikeInput: LikeInput;
  LogEventInput: LogEventInput;
  MediaAttachment: MediaAttachment;
  MediaAttachmentInput: MediaAttachmentInput;
  Message: Message;
  Mutation: {};
  ID: Scalars["ID"]["output"];
  Perk: Omit<Perk, "unlockRule"> & {
    unlockRule: ResolversParentTypes["UnlockRule"];
  };
  PerkInput: PerkInput;
  Post: Post;
  Query: {};
  Rank: Rank;
  RankInput: RankInput;
  Reward: Reward;
  RewardInput: RewardInput;
  SocialLink: SocialLink;
  SocialLinkInput: SocialLinkInput;
  Subscription: {};
  Timestamp: Scalars["Timestamp"]["output"];
  Tip: Tip;
  TipByBaker: TipByBaker;
  UnlockRule: UnlockRule;
  UnlockRuleInput: UnlockRuleInput;
  UnlockedPerkState: Omit<UnlockedPerkState, "perk"> & {
    perk: ResolversParentTypes["Perk"];
  };
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  Upload: Scalars["Upload"]["output"];
  User: User;
  UserAchievements: UserAchievements;
  UserByInput: UserByInput;
  UserInput: UserInput;
  UserRank: UserRank;
  XPEntry: XPEntry;
};

export type cacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars["Boolean"]["input"]>;
  maxAge?: Maybe<Scalars["Int"]["input"]>;
  scope?: Maybe<CacheControlScope>;
};

export type cacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = cacheControlDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActorResolvers = EnumResolverSignature<
  { OWNER?: any; SELF?: any; TARGET?: any },
  ResolversTypes["Actor"]
>;

export type AgentOutputResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["AgentOutput"] = ResolversParentTypes["AgentOutput"],
> = {
  done?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["Message"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CacheControlScopeResolvers = EnumResolverSignature<
  { PRIVATE?: any; PUBLIC?: any },
  ResolversTypes["CacheControlScope"]
>;

export type CommentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  parentComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
  repliesCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type DistinctByResolvers = EnumResolverSignature<
  { NONE?: any; TARGET?: any; USER?: any },
  ResolversTypes["DistinctBy"]
>;

export type EventLogResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["EventLog"] = ResolversParentTypes["EventLog"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes["JSON"]>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  targetType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExecutionRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ExecutionRule"] = ResolversParentTypes["ExecutionRule"],
> = {
  cooldownSec?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JSONScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type MediaAttachmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["MediaAttachment"] = ResolversParentTypes["MediaAttachment"],
> = {
  cid?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Message"] = ResolversParentTypes["Message"],
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  claimPerk?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationclaimPerkArgs, "perkId">
  >;
  createComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateCommentArgs, "input">
  >;
  createPerk?: Resolver<
    ResolversTypes["Perk"],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePerkArgs, "input">
  >;
  createPost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePostArgs, "input">
  >;
  createRank?: Resolver<
    ResolversTypes["Rank"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateRankArgs, "input">
  >;
  createTip?: Resolver<
    ResolversTypes["Tip"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTipArgs, "input">
  >;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "input">
  >;
  deletePerk?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeletePerkArgs, "id">
  >;
  deleteRank?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteRankArgs, "id">
  >;
  hideComment?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationhideCommentArgs, "commentId">
  >;
  hidePost?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationhidePostArgs, "postId">
  >;
  humanMessage?: Resolver<
    Maybe<ResolversTypes["Message"]>,
    ParentType,
    ContextType,
    RequireFields<MutationhumanMessageArgs, "input">
  >;
  incrementPostView?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationincrementPostViewArgs, "postId">
  >;
  logAnonymousEvent?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationlogAnonymousEventArgs, "input">
  >;
  logEvent?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationlogEventArgs, "input">
  >;
  toggleBookmark?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationtoggleBookmarkArgs, "input">
  >;
  toggleFollow?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationtoggleFollowArgs, "input">
  >;
  toggleLike?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationtoggleLikeArgs, "input">
  >;
  updateComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateCommentArgs, "input">
  >;
  updatePerk?: Resolver<
    ResolversTypes["Perk"],
    ParentType,
    ContextType,
    RequireFields<MutationupdatePerkArgs, "id" | "patch">
  >;
  updatePost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationupdatePostArgs, "input">
  >;
  updateRank?: Resolver<
    ResolversTypes["Rank"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateRankArgs, "id" | "patch">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserArgs, "input">
  >;
};

export type PerkResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Perk"] = ResolversParentTypes["Perk"],
> = {
  availableAt?: Resolver<
    Maybe<ResolversTypes["Timestamp"]>,
    ParentType,
    ContextType
  >;
  category?: Resolver<ResolversTypes["PerkCategory"], ParentType, ContextType>;
  collectedAt?: Resolver<
    Maybe<ResolversTypes["Timestamp"]>,
    ParentType,
    ContextType
  >;
  cooldownRemaining?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  executionRule?: Resolver<
    ResolversTypes["ExecutionRule"],
    ParentType,
    ContextType
  >;
  hooks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["JSON"]>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  minRankId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes["Reward"], ParentType, ContextType>;
  rewardPreview?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  uiHint?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  unlockRule?: Resolver<ResolversTypes["UnlockRule"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerkCategoryResolvers = EnumResolverSignature<
  { ACCESS?: any; ECONOMY?: any; GAMIFICATION?: any; SOCIAL?: any },
  ResolversTypes["PerkCategory"]
>;

export type PostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Post"] = ResolversParentTypes["Post"],
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  bookmarkCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  cid?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  commentCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  credits?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  media?: Resolver<
    Array<ResolversTypes["MediaAttachment"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes["VisibilitySetting"],
    ParentType,
    ContextType
  >;
  year?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  getAchievements?: Resolver<
    ResolversTypes["UserAchievements"],
    ParentType,
    ContextType,
    RequireFields<QuerygetAchievementsArgs, "address">
  >;
  getActiveUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    Partial<QuerygetActiveUsersArgs>
  >;
  getAllPosts?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    Partial<QuerygetAllPostsArgs>
  >;
  getBookmarksByPost?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetBookmarksByPostArgs, "limit" | "postId">
  >;
  getBookmarksByUser?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetBookmarksByUserArgs, "address" | "limit">
  >;
  getCommentsByPost?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetCommentsByPostArgs, "postId">
  >;
  getCreatorTips?: Resolver<
    Array<ResolversTypes["Tip"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetCreatorTipsArgs, "address">
  >;
  getIsBookmarked?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QuerygetIsBookmarkedArgs, "postId">
  >;
  getIsFollowing?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QuerygetIsFollowingArgs, "targetAddress">
  >;
  getIsLiked?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QuerygetIsLikedArgs, "targetId">
  >;
  getLeaderboard?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetLeaderboardArgs, "limit">
  >;
  getPerks?: Resolver<Array<ResolversTypes["Perk"]>, ParentType, ContextType>;
  getPopularPosts?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    Partial<QuerygetPopularPostsArgs>
  >;
  getPopularUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    Partial<QuerygetPopularUsersArgs>
  >;
  getPost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetPostArgs, "id">
  >;
  getPostViews?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QuerygetPostViewsArgs, "postId">
  >;
  getPosts?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetPostsArgs, "query">
  >;
  getPostsByAuthor?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetPostsByAuthorArgs, "author">
  >;
  getProfileViews?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QuerygetProfileViewsArgs, "address">
  >;
  getRanksCatalog?: Resolver<
    Array<ResolversTypes["Rank"]>,
    ParentType,
    ContextType
  >;
  getRecentPosts?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    Partial<QuerygetRecentPostsArgs>
  >;
  getRecentUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    Partial<QuerygetRecentUsersArgs>
  >;
  getRepliesByComment?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetRepliesByCommentArgs, "commentId">
  >;
  getTargetEvents?: Resolver<
    Array<ResolversTypes["EventLog"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetTargetEventsArgs, "limit" | "offset" | "targetId">
  >;
  getTipsByBakerForPost?: Resolver<
    Array<ResolversTypes["TipByBaker"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetTipsByBakerForPostArgs, "postId">
  >;
  getTipsForPost?: Resolver<
    Array<ResolversTypes["Tip"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetTipsForPostArgs, "postId">
  >;
  getUnlockedPerks?: Resolver<
    Array<ResolversTypes["UnlockedPerkState"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUnlockedPerksArgs, "address" | "limit" | "offset">
  >;
  getUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserArgs, "input">
  >;
  getUserBookmarks?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserBookmarksArgs, "address">
  >;
  getUserEvents?: Resolver<
    Array<ResolversTypes["EventLog"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserEventsArgs, "address" | "limit" | "offset">
  >;
  getUserFollowers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserFollowersArgs, "address">
  >;
  getUserFollowing?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserFollowingArgs, "address">
  >;
  getUserRanks?: Resolver<
    Array<ResolversTypes["UserRank"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserRanksArgs, "address">
  >;
  getUserTipsHistory?: Resolver<
    Array<ResolversTypes["Tip"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserTipsHistoryArgs, "address">
  >;
  getUserXPHistory?: Resolver<
    Array<ResolversTypes["XPEntry"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUserXPHistoryArgs, "address" | "limit" | "offset">
  >;
  getUsers?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygetUsersArgs, "query">
  >;
  hasPerk?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QueryhasPerkArgs, "address" | "perkId">
  >;
};

export type RankResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Rank"] = ResolversParentTypes["Rank"],
> = {
  badgeUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  colorTheme?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  minXp?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RewardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Reward"] = ResolversParentTypes["Reward"],
> = {
  action?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  tokenId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialLinkResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SocialLink"] = ResolversParentTypes["SocialLink"],
> = {
  platform?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  onAiMessage?: SubscriptionResolver<
    Maybe<ResolversTypes["AgentOutput"]>,
    "onAiMessage",
    ParentType,
    ContextType
  >;
};

export type TargetTypeResolvers = EnumResolverSignature<
  { COMMENT?: any; POST?: any },
  ResolversTypes["TargetType"]
>;

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export type TipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tip"] = ResolversParentTypes["Tip"],
> = {
  amount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  baker?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  postId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  txHash?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TipByBakerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["TipByBaker"] = ResolversParentTypes["TipByBaker"],
> = {
  baker?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  count?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  lastTipAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlockRuleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UnlockRule"] = ResolversParentTypes["UnlockRule"],
> = {
  action?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  actor?: Resolver<Maybe<ResolversTypes["Actor"]>, ParentType, ContextType>;
  distinctBy?: Resolver<
    Maybe<ResolversTypes["DistinctBy"]>,
    ParentType,
    ContextType
  >;
  on?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rankId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  times?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  window?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlockedPerkStateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UnlockedPerkState"] = ResolversParentTypes["UnlockedPerkState"],
> = {
  availableAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  collectedAt?: Resolver<
    Maybe<ResolversTypes["Timestamp"]>,
    ParentType,
    ContextType
  >;
  cooldownSec?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  perk?: Resolver<ResolversTypes["Perk"], ParentType, ContextType>;
  perkId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  progress?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  target?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bookmarksCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  coverPicture?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  currentRank?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  followersCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profilePicture?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publicationsCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  socialLinks?: Resolver<
    Maybe<Array<ResolversTypes["SocialLink"]>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  xpBalance?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  xpTotal?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAchievementsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserAchievements"] = ResolversParentTypes["UserAchievements"],
> = {
  currentRank?: Resolver<ResolversTypes["Rank"], ParentType, ContextType>;
  nextRank?: Resolver<Maybe<ResolversTypes["Rank"]>, ParentType, ContextType>;
  progressPct?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  xpBalance?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  xpRemaining?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  xpTotal?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRankResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["UserRank"] = ResolversParentTypes["UserRank"],
> = {
  achievedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  rankId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisibilitySettingResolvers = EnumResolverSignature<
  { FOLLOWERS_ONLY?: any; PRIVATE?: any; PUBLIC?: any },
  ResolversTypes["VisibilitySetting"]
>;

export type XPEntryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["XPEntry"] = ResolversParentTypes["XPEntry"],
> = {
  action?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  balanceAfter?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  balanceBefore?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  totalAfter?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Actor?: ActorResolvers;
  AgentOutput?: AgentOutputResolvers<ContextType>;
  CacheControlScope?: CacheControlScopeResolvers;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DistinctBy?: DistinctByResolvers;
  EventLog?: EventLogResolvers<ContextType>;
  ExecutionRule?: ExecutionRuleResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  MediaAttachment?: MediaAttachmentResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Perk?: PerkResolvers<ContextType>;
  PerkCategory?: PerkCategoryResolvers;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rank?: RankResolvers<ContextType>;
  Reward?: RewardResolvers<ContextType>;
  SocialLink?: SocialLinkResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TargetType?: TargetTypeResolvers;
  Timestamp?: GraphQLScalarType;
  Tip?: TipResolvers<ContextType>;
  TipByBaker?: TipByBakerResolvers<ContextType>;
  UnlockRule?: UnlockRuleResolvers<ContextType>;
  UnlockedPerkState?: UnlockedPerkStateResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAchievements?: UserAchievementsResolvers<ContextType>;
  UserRank?: UserRankResolvers<ContextType>;
  VisibilitySetting?: VisibilitySettingResolvers;
  XPEntry?: XPEntryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};
