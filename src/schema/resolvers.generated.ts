/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { getAchievements as Query_getAchievements } from './../graphql/ranks/resolvers/Query/getAchievements';
import    { getActiveUsers as Query_getActiveUsers } from './../graphql/feeds/resolvers/Query/getActiveUsers';
import    { getAllPosts as Query_getAllPosts } from './../graphql/feeds/resolvers/Query/getAllPosts';
import    { getBookmarksByPost as Query_getBookmarksByPost } from './../graphql/bookmarks/resolvers/Query/getBookmarksByPost';
import    { getBookmarksByUser as Query_getBookmarksByUser } from './../graphql/bookmarks/resolvers/Query/getBookmarksByUser';
import    { getCommentsByPost as Query_getCommentsByPost } from './../graphql/comments/resolvers/Query/getCommentsByPost';
import    { getCreatorTips as Query_getCreatorTips } from './../graphql/tips/resolvers/Query/getCreatorTips';
import    { getIsBookmarked as Query_getIsBookmarked } from './../graphql/bookmarks/resolvers/Query/getIsBookmarked';
import    { getIsFollowing as Query_getIsFollowing } from './../graphql/follows/resolvers/Query/getIsFollowing';
import    { getIsLiked as Query_getIsLiked } from './../graphql/likes/resolvers/Query/getIsLiked';
import    { getLeaderboard as Query_getLeaderboard } from './../graphql/leaderboard/resolvers/Query/getLeaderboard';
import    { getPerks as Query_getPerks } from './../graphql/perks/resolvers/Query/getPerks';
import    { getPopularPosts as Query_getPopularPosts } from './../graphql/feeds/resolvers/Query/getPopularPosts';
import    { getPopularUsers as Query_getPopularUsers } from './../graphql/feeds/resolvers/Query/getPopularUsers';
import    { getPost as Query_getPost } from './../graphql/posts/resolvers/Query/getPost';
import    { getPostViews as Query_getPostViews } from './../graphql/logs/resolvers/Query/getPostViews';
import    { getPosts as Query_getPosts } from './../graphql/posts/resolvers/Query/getPosts';
import    { getPostsByAuthor as Query_getPostsByAuthor } from './../graphql/posts/resolvers/Query/getPostsByAuthor';
import    { getProfileViews as Query_getProfileViews } from './../graphql/logs/resolvers/Query/getProfileViews';
import    { getRanksCatalog as Query_getRanksCatalog } from './../graphql/ranks/resolvers/Query/getRanksCatalog';
import    { getRecentPosts as Query_getRecentPosts } from './../graphql/feeds/resolvers/Query/getRecentPosts';
import    { getRecentUsers as Query_getRecentUsers } from './../graphql/feeds/resolvers/Query/getRecentUsers';
import    { getRepliesByComment as Query_getRepliesByComment } from './../graphql/comments/resolvers/Query/getRepliesByComment';
import    { getTargetEvents as Query_getTargetEvents } from './../graphql/logs/resolvers/Query/getTargetEvents';
import    { getTipsByBakerForPost as Query_getTipsByBakerForPost } from './../graphql/tips/resolvers/Query/getTipsByBakerForPost';
import    { getTipsForPost as Query_getTipsForPost } from './../graphql/tips/resolvers/Query/getTipsForPost';
import    { getUnlockedPerks as Query_getUnlockedPerks } from './../graphql/perks/resolvers/Query/getUnlockedPerks';
import    { getUser as Query_getUser } from './../graphql/users/resolvers/Query/getUser';
import    { getUserBookmarks as Query_getUserBookmarks } from './../graphql/users/resolvers/Query/getUserBookmarks';
import    { getUserEvents as Query_getUserEvents } from './../graphql/logs/resolvers/Query/getUserEvents';
import    { getUserFollowers as Query_getUserFollowers } from './../graphql/users/resolvers/Query/getUserFollowers';
import    { getUserFollowing as Query_getUserFollowing } from './../graphql/users/resolvers/Query/getUserFollowing';
import    { getUserRanks as Query_getUserRanks } from './../graphql/ranks/resolvers/Query/getUserRanks';
import    { getUserTipsHistory as Query_getUserTipsHistory } from './../graphql/tips/resolvers/Query/getUserTipsHistory';
import    { getUserXPHistory as Query_getUserXPHistory } from './../graphql/xp/resolvers/Query/getUserXPHistory';
import    { getUsers as Query_getUsers } from './../graphql/users/resolvers/Query/getUsers';
import    { hasPerk as Query_hasPerk } from './../graphql/perks/resolvers/Query/hasPerk';
import    { claimPerk as Mutation_claimPerk } from './../graphql/perks/resolvers/Mutation/claimPerk';
import    { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import    { createPerk as Mutation_createPerk } from './../graphql/perks/resolvers/Mutation/createPerk';
import    { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import    { createRank as Mutation_createRank } from './../graphql/ranks/resolvers/Mutation/createRank';
import    { createTip as Mutation_createTip } from './../graphql/tips/resolvers/Mutation/createTip';
import    { createUser as Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { deletePerk as Mutation_deletePerk } from './../graphql/perks/resolvers/Mutation/deletePerk';
import    { deleteRank as Mutation_deleteRank } from './../graphql/ranks/resolvers/Mutation/deleteRank';
import    { hideComment as Mutation_hideComment } from './../graphql/comments/resolvers/Mutation/hideComment';
import    { hidePost as Mutation_hidePost } from './../graphql/posts/resolvers/Mutation/hidePost';
import    { incrementPostView as Mutation_incrementPostView } from './../graphql/posts/resolvers/Mutation/incrementPostView';
import    { logAnonymousEvent as Mutation_logAnonymousEvent } from './../graphql/logs/resolvers/Mutation/logAnonymousEvent';
import    { logEvent as Mutation_logEvent } from './../graphql/logs/resolvers/Mutation/logEvent';
import    { toggleBookmark as Mutation_toggleBookmark } from './../graphql/bookmarks/resolvers/Mutation/toggleBookmark';
import    { toggleFollow as Mutation_toggleFollow } from './../graphql/follows/resolvers/Mutation/toggleFollow';
import    { toggleLike as Mutation_toggleLike } from './../graphql/likes/resolvers/Mutation/toggleLike';
import    { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import    { updatePerk as Mutation_updatePerk } from './../graphql/perks/resolvers/Mutation/updatePerk';
import    { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import    { updateRank as Mutation_updateRank } from './../graphql/ranks/resolvers/Mutation/updateRank';
import    { updateUser as Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { Comment } from './../graphql/comments/resolvers/Comment';
import    { EventLog } from './../graphql/logs/resolvers/EventLog';
import    { ExecutionRule } from './../graphql/perks/resolvers/ExecutionRule';
import    { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import    { Perk } from './../graphql/perks/resolvers/Perk';
import    { Post } from './../graphql/posts/resolvers/Post';
import    { Rank } from './../graphql/ranks/resolvers/Rank';
import    { Reward } from './../graphql/perks/resolvers/Reward';
import    { SocialLink } from './../graphql/users/resolvers/SocialLink';
import    { Tip } from './../graphql/tips/resolvers/Tip';
import    { TipByBaker } from './../graphql/tips/resolvers/TipByBaker';
import    { UnlockRule } from './../graphql/perks/resolvers/UnlockRule';
import    { UnlockedPerkState } from './../graphql/perks/resolvers/UnlockedPerkState';
import    { User } from './../graphql/users/resolvers/User';
import    { UserAchievements } from './../graphql/ranks/resolvers/UserAchievements';
import    { UserRank } from './../graphql/ranks/resolvers/UserRank';
import    { XPEntry } from './../graphql/xp/resolvers/XPEntry';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { getAchievements: Query_getAchievements,getActiveUsers: Query_getActiveUsers,getAllPosts: Query_getAllPosts,getBookmarksByPost: Query_getBookmarksByPost,getBookmarksByUser: Query_getBookmarksByUser,getCommentsByPost: Query_getCommentsByPost,getCreatorTips: Query_getCreatorTips,getIsBookmarked: Query_getIsBookmarked,getIsFollowing: Query_getIsFollowing,getIsLiked: Query_getIsLiked,getLeaderboard: Query_getLeaderboard,getPerks: Query_getPerks,getPopularPosts: Query_getPopularPosts,getPopularUsers: Query_getPopularUsers,getPost: Query_getPost,getPostViews: Query_getPostViews,getPosts: Query_getPosts,getPostsByAuthor: Query_getPostsByAuthor,getProfileViews: Query_getProfileViews,getRanksCatalog: Query_getRanksCatalog,getRecentPosts: Query_getRecentPosts,getRecentUsers: Query_getRecentUsers,getRepliesByComment: Query_getRepliesByComment,getTargetEvents: Query_getTargetEvents,getTipsByBakerForPost: Query_getTipsByBakerForPost,getTipsForPost: Query_getTipsForPost,getUnlockedPerks: Query_getUnlockedPerks,getUser: Query_getUser,getUserBookmarks: Query_getUserBookmarks,getUserEvents: Query_getUserEvents,getUserFollowers: Query_getUserFollowers,getUserFollowing: Query_getUserFollowing,getUserRanks: Query_getUserRanks,getUserTipsHistory: Query_getUserTipsHistory,getUserXPHistory: Query_getUserXPHistory,getUsers: Query_getUsers,hasPerk: Query_hasPerk },
      Mutation: { claimPerk: Mutation_claimPerk,createComment: Mutation_createComment,createPerk: Mutation_createPerk,createPost: Mutation_createPost,createRank: Mutation_createRank,createTip: Mutation_createTip,createUser: Mutation_createUser,deletePerk: Mutation_deletePerk,deleteRank: Mutation_deleteRank,hideComment: Mutation_hideComment,hidePost: Mutation_hidePost,incrementPostView: Mutation_incrementPostView,logAnonymousEvent: Mutation_logAnonymousEvent,logEvent: Mutation_logEvent,toggleBookmark: Mutation_toggleBookmark,toggleFollow: Mutation_toggleFollow,toggleLike: Mutation_toggleLike,updateComment: Mutation_updateComment,updatePerk: Mutation_updatePerk,updatePost: Mutation_updatePost,updateRank: Mutation_updateRank,updateUser: Mutation_updateUser },
      
      Comment: Comment,
EventLog: EventLog,
ExecutionRule: ExecutionRule,
MediaAttachment: MediaAttachment,
Perk: Perk,
Post: Post,
Rank: Rank,
Reward: Reward,
SocialLink: SocialLink,
Tip: Tip,
TipByBaker: TipByBaker,
UnlockRule: UnlockRule,
UnlockedPerkState: UnlockedPerkState,
User: User,
UserAchievements: UserAchievements,
UserRank: UserRank,
XPEntry: XPEntry,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver,
Timestamp: TimestampResolver
    }