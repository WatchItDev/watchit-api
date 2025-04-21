/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { activeUsers as Query_activeUsers } from './../graphql/feeds/resolvers/Query/activeUsers';
import    { allPosts as Query_allPosts } from './../graphql/feeds/resolvers/Query/allPosts';
import    { commentsByPost as Query_commentsByPost } from './../graphql/comments/resolvers/Query/commentsByPost';
import    { getUsers as Query_getUsers } from './../graphql/users/resolvers/Query/getUsers';
import    { popularPosts as Query_popularPosts } from './../graphql/feeds/resolvers/Query/popularPosts';
import    { popularUsers as Query_popularUsers } from './../graphql/feeds/resolvers/Query/popularUsers';
import    { post as Query_post } from './../graphql/posts/resolvers/Query/post';
import    { postsByAuthor as Query_postsByAuthor } from './../graphql/posts/resolvers/Query/postsByAuthor';
import    { recentPosts as Query_recentPosts } from './../graphql/feeds/resolvers/Query/recentPosts';
import    { recentUsers as Query_recentUsers } from './../graphql/feeds/resolvers/Query/recentUsers';
import    { repliesByComment as Query_repliesByComment } from './../graphql/comments/resolvers/Query/repliesByComment';
import    { user as users_Query_user } from './../graphql/users/resolvers/Query/user';
import    { bookmarkPost as Mutation_bookmarkPost } from './../graphql/social/resolvers/Mutation/bookmarkPost';
import    { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import    { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import    { createUser as users_Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { deleteComment as Mutation_deleteComment } from './../graphql/comments/resolvers/Mutation/deleteComment';
import    { deletePost as Mutation_deletePost } from './../graphql/posts/resolvers/Mutation/deletePost';
import    { followUser as Mutation_followUser } from './../graphql/social/resolvers/Mutation/followUser';
import    { incrementPostView as Mutation_incrementPostView } from './../graphql/posts/resolvers/Mutation/incrementPostView';
import    { likeComment as Mutation_likeComment } from './../graphql/social/resolvers/Mutation/likeComment';
import    { likePost as Mutation_likePost } from './../graphql/social/resolvers/Mutation/likePost';
import    { unbookmarkPost as Mutation_unbookmarkPost } from './../graphql/social/resolvers/Mutation/unbookmarkPost';
import    { unfollowUser as Mutation_unfollowUser } from './../graphql/social/resolvers/Mutation/unfollowUser';
import    { unlikeComment as Mutation_unlikeComment } from './../graphql/social/resolvers/Mutation/unlikeComment';
import    { unlikePost as Mutation_unlikePost } from './../graphql/social/resolvers/Mutation/unlikePost';
import    { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import    { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import    { updateUser as users_Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { Comment } from './../graphql/comments/resolvers/Comment';
import    { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import    { Post } from './../graphql/posts/resolvers/Post';
import    { SocialLink } from './../graphql/users/resolvers/SocialLink';
import    { User } from './../graphql/users/resolvers/User';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { user as users_Query_user } from './../graphql/users/resolvers/Query/User';
import    { createUser as users_Mutation_createUser } from './../graphql/users/resolvers/Mutation/CreateUser';
import    { updateUser as users_Mutation_updateUser } from './../graphql/users/resolvers/Mutation/UpdateUser';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { activeUsers: Query_activeUsers,allPosts: Query_allPosts,commentsByPost: Query_commentsByPost,getUsers: Query_getUsers,popularPosts: Query_popularPosts,popularUsers: Query_popularUsers,post: Query_post,postsByAuthor: Query_postsByAuthor,recentPosts: Query_recentPosts,recentUsers: Query_recentUsers,repliesByComment: Query_repliesByComment,user: users_Query_user,user: users_Query_user },
      Mutation: { bookmarkPost: Mutation_bookmarkPost,createComment: Mutation_createComment,createPost: Mutation_createPost,createUser: users_Mutation_createUser,deleteComment: Mutation_deleteComment,deletePost: Mutation_deletePost,followUser: Mutation_followUser,incrementPostView: Mutation_incrementPostView,likeComment: Mutation_likeComment,likePost: Mutation_likePost,unbookmarkPost: Mutation_unbookmarkPost,unfollowUser: Mutation_unfollowUser,unlikeComment: Mutation_unlikeComment,unlikePost: Mutation_unlikePost,updateComment: Mutation_updateComment,updatePost: Mutation_updatePost,updateUser: users_Mutation_updateUser,createUser: users_Mutation_createUser,updateUser: users_Mutation_updateUser },
      
      Comment: Comment,
MediaAttachment: MediaAttachment,
Post: Post,
SocialLink: SocialLink,
User: User,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver,
Timestamp: TimestampResolver
    }