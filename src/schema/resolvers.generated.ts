/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { getActiveUsers as Query_getActiveUsers } from './../graphql/feeds/resolvers/Query/getActiveUsers';
import    { getAllPosts as Query_getAllPosts } from './../graphql/feeds/resolvers/Query/getAllPosts';
import    { getBookmarksByPost as Query_getBookmarksByPost } from './../graphql/bookmarks/resolvers/Query/getBookmarksByPost';
import    { getBookmarksByUser as Query_getBookmarksByUser } from './../graphql/bookmarks/resolvers/Query/getBookmarksByUser';
import    { getCommentsByPost as Query_getCommentsByPost } from './../graphql/comments/resolvers/Query/getCommentsByPost';
import    { getIsBookmarked as Query_getIsBookmarked } from './../graphql/bookmarks/resolvers/Query/getIsBookmarked';
import    { getIsFollowing as Query_getIsFollowing } from './../graphql/follows/resolvers/Query/getIsFollowing';
import    { getIsLiked as Query_getIsLiked } from './../graphql/likes/resolvers/Query/getIsLiked';
import    { getPopularPosts as Query_getPopularPosts } from './../graphql/feeds/resolvers/Query/getPopularPosts';
import    { getPopularUsers as Query_getPopularUsers } from './../graphql/feeds/resolvers/Query/getPopularUsers';
import    { getPost as Query_getPost } from './../graphql/posts/resolvers/Query/getPost';
import    { getPostViews as Query_getPostViews } from './../graphql/logs/resolvers/Query/getPostViews';
import    { getPosts as Query_getPosts } from './../graphql/posts/resolvers/Query/getPosts';
import    { getPostsByAuthor as Query_getPostsByAuthor } from './../graphql/posts/resolvers/Query/getPostsByAuthor';
import    { getProfileViews as Query_getProfileViews } from './../graphql/logs/resolvers/Query/getProfileViews';
import    { getRecentPosts as Query_getRecentPosts } from './../graphql/feeds/resolvers/Query/getRecentPosts';
import    { getRecentUsers as Query_getRecentUsers } from './../graphql/feeds/resolvers/Query/getRecentUsers';
import    { getRepliesByComment as Query_getRepliesByComment } from './../graphql/comments/resolvers/Query/getRepliesByComment';
import    { getTargetEvents as Query_getTargetEvents } from './../graphql/logs/resolvers/Query/getTargetEvents';
import    { getUser as Query_getUser } from './../graphql/users/resolvers/Query/getUser';
import    { getUserBookmarks as Query_getUserBookmarks } from './../graphql/users/resolvers/Query/getUserBookmarks';
import    { getUserEvents as Query_getUserEvents } from './../graphql/logs/resolvers/Query/getUserEvents';
import    { getUserFollowers as Query_getUserFollowers } from './../graphql/users/resolvers/Query/getUserFollowers';
import    { getUserFollowing as Query_getUserFollowing } from './../graphql/users/resolvers/Query/getUserFollowing';
import    { getUserXPHistory as Query_getUserXPHistory } from './../graphql/xp/resolvers/Query/getUserXPHistory';
import    { getUsers as Query_getUsers } from './../graphql/users/resolvers/Query/getUsers';
import    { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import    { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import    { createUser as Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { hideComment as Mutation_hideComment } from './../graphql/comments/resolvers/Mutation/hideComment';
import    { hidePost as Mutation_hidePost } from './../graphql/posts/resolvers/Mutation/hidePost';
import    { incrementPostView as Mutation_incrementPostView } from './../graphql/posts/resolvers/Mutation/incrementPostView';
import    { logAnonymousEvent as Mutation_logAnonymousEvent } from './../graphql/logs/resolvers/Mutation/logAnonymousEvent';
import    { logEvent as Mutation_logEvent } from './../graphql/logs/resolvers/Mutation/logEvent';
import    { toggleBookmark as Mutation_toggleBookmark } from './../graphql/bookmarks/resolvers/Mutation/toggleBookmark';
import    { toggleFollow as Mutation_toggleFollow } from './../graphql/follows/resolvers/Mutation/toggleFollow';
import    { toggleLike as Mutation_toggleLike } from './../graphql/likes/resolvers/Mutation/toggleLike';
import    { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import    { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import    { updateUser as Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { Comment } from './../graphql/comments/resolvers/Comment';
import    { EventLog } from './../graphql/logs/resolvers/EventLog';
import    { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import    { Post } from './../graphql/posts/resolvers/Post';
import    { SocialLink } from './../graphql/users/resolvers/SocialLink';
import    { User } from './../graphql/users/resolvers/User';
import    { XPEntry } from './../graphql/xp/resolvers/XPEntry';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { getActiveUsers: Query_getActiveUsers,getAllPosts: Query_getAllPosts,getBookmarksByPost: Query_getBookmarksByPost,getBookmarksByUser: Query_getBookmarksByUser,getCommentsByPost: Query_getCommentsByPost,getIsBookmarked: Query_getIsBookmarked,getIsFollowing: Query_getIsFollowing,getIsLiked: Query_getIsLiked,getPopularPosts: Query_getPopularPosts,getPopularUsers: Query_getPopularUsers,getPost: Query_getPost,getPostViews: Query_getPostViews,getPosts: Query_getPosts,getPostsByAuthor: Query_getPostsByAuthor,getProfileViews: Query_getProfileViews,getRecentPosts: Query_getRecentPosts,getRecentUsers: Query_getRecentUsers,getRepliesByComment: Query_getRepliesByComment,getTargetEvents: Query_getTargetEvents,getUser: Query_getUser,getUserBookmarks: Query_getUserBookmarks,getUserEvents: Query_getUserEvents,getUserFollowers: Query_getUserFollowers,getUserFollowing: Query_getUserFollowing,getUserXPHistory: Query_getUserXPHistory,getUsers: Query_getUsers },
      Mutation: { createComment: Mutation_createComment,createPost: Mutation_createPost,createUser: Mutation_createUser,hideComment: Mutation_hideComment,hidePost: Mutation_hidePost,incrementPostView: Mutation_incrementPostView,logAnonymousEvent: Mutation_logAnonymousEvent,logEvent: Mutation_logEvent,toggleBookmark: Mutation_toggleBookmark,toggleFollow: Mutation_toggleFollow,toggleLike: Mutation_toggleLike,updateComment: Mutation_updateComment,updatePost: Mutation_updatePost,updateUser: Mutation_updateUser },
      
      Comment: Comment,
EventLog: EventLog,
MediaAttachment: MediaAttachment,
Post: Post,
SocialLink: SocialLink,
User: User,
XPEntry: XPEntry,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver,
Timestamp: TimestampResolver
    }