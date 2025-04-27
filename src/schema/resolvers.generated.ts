/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { getCommentsByPost as Query_getCommentsByPost } from './../graphql/comments/resolvers/Query/getCommentsByPost';
import    { getPost as Query_getPost } from './../graphql/posts/resolvers/Query/getPost';
import    { getPostsByAuthor as Query_getPostsByAuthor } from './../graphql/posts/resolvers/Query/getPostsByAuthor';
import    { getRepliesByComment as Query_getRepliesByComment } from './../graphql/comments/resolvers/Query/getRepliesByComment';
import    { getUser as Query_getUser } from './../graphql/users/resolvers/Query/getUser';
import    { getUserBookmarks as Query_getUserBookmarks } from './../graphql/users/resolvers/Query/getUserBookmarks';
import    { getUserFollowers as Query_getUserFollowers } from './../graphql/users/resolvers/Query/getUserFollowers';
import    { getUserFollowing as Query_getUserFollowing } from './../graphql/users/resolvers/Query/getUserFollowing';
import    { getUsers as Query_getUsers } from './../graphql/users/resolvers/Query/getUsers';
import    { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import    { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import    { createUser as Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { deleteComment as Mutation_deleteComment } from './../graphql/comments/resolvers/Mutation/deleteComment';
import    { deletePost as Mutation_deletePost } from './../graphql/posts/resolvers/Mutation/deletePost';
import    { incrementPostView as Mutation_incrementPostView } from './../graphql/posts/resolvers/Mutation/incrementPostView';
import    { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import    { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import    { updateUser as Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { Comment } from './../graphql/comments/resolvers/Comment';
import    { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import    { Post } from './../graphql/posts/resolvers/Post';
import    { SocialLink } from './../graphql/users/resolvers/SocialLink';
import    { User } from './../graphql/users/resolvers/User';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { getCommentsByPost: Query_getCommentsByPost,getPost: Query_getPost,getPostsByAuthor: Query_getPostsByAuthor,getRepliesByComment: Query_getRepliesByComment,getUser: Query_getUser,getUserBookmarks: Query_getUserBookmarks,getUserFollowers: Query_getUserFollowers,getUserFollowing: Query_getUserFollowing,getUsers: Query_getUsers },
      Mutation: { createComment: Mutation_createComment,createPost: Mutation_createPost,createUser: Mutation_createUser,deleteComment: Mutation_deleteComment,deletePost: Mutation_deletePost,incrementPostView: Mutation_incrementPostView,updateComment: Mutation_updateComment,updatePost: Mutation_updatePost,updateUser: Mutation_updateUser },
      
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