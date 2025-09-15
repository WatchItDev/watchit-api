/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { getComment as Query_getComment } from './../graphql/comments/resolvers/Query/getComment';
import    { getComments as Query_getComments } from './../graphql/comments/resolvers/Query/getComments';
import    { getCreatorTips as Query_getCreatorTips } from './../graphql/tips/resolvers/Query/getCreatorTips';
import    { getIsFollowing as Query_getIsFollowing } from './../graphql/follows/resolvers/Query/getIsFollowing';
import    { getIsLiked as Query_getIsLiked } from './../graphql/likes/resolvers/Query/getIsLiked';
import    { getPost as Query_getPost } from './../graphql/posts/resolvers/Query/getPost';
import    { getPostViews as Query_getPostViews } from './../graphql/logs/resolvers/Query/getPostViews';
import    { getPosts as Query_getPosts } from './../graphql/posts/resolvers/Query/getPosts';
import    { getProfileViews as Query_getProfileViews } from './../graphql/logs/resolvers/Query/getProfileViews';
import    { getTargetEvents as Query_getTargetEvents } from './../graphql/logs/resolvers/Query/getTargetEvents';
import    { getTipsByBakerForPost as Query_getTipsByBakerForPost } from './../graphql/tips/resolvers/Query/getTipsByBakerForPost';
import    { getTipsForPost as Query_getTipsForPost } from './../graphql/tips/resolvers/Query/getTipsForPost';
import    { getUser as Query_getUser } from './../graphql/users/resolvers/Query/getUser';
import    { getUserEvents as Query_getUserEvents } from './../graphql/logs/resolvers/Query/getUserEvents';
import    { getUserTipsHistory as Query_getUserTipsHistory } from './../graphql/tips/resolvers/Query/getUserTipsHistory';
import    { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import    { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import    { createTip as Mutation_createTip } from './../graphql/tips/resolvers/Mutation/createTip';
import    { createUser as Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { hidePost as Mutation_hidePost } from './../graphql/posts/resolvers/Mutation/hidePost';
import    { humanMessage as Mutation_humanMessage } from './../graphql/agents/resolvers/Mutation/humanMessage';
import    { logAnonymousEvent as Mutation_logAnonymousEvent } from './../graphql/logs/resolvers/Mutation/logAnonymousEvent';
import    { logEvent as Mutation_logEvent } from './../graphql/logs/resolvers/Mutation/logEvent';
import    { toggleFollow as Mutation_toggleFollow } from './../graphql/follows/resolvers/Mutation/toggleFollow';
import    { toggleLike as Mutation_toggleLike } from './../graphql/likes/resolvers/Mutation/toggleLike';
import    { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import    { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import    { updateUser as Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { onAiMessage as Subscription_onAiMessage } from './../graphql/agents/resolvers/Subscription/onAiMessage';
import    { AgentOutput } from './../graphql/agents/resolvers/AgentOutput';
import    { BaseContent } from './../graphql/content/resolvers/BaseContent';
import    { Comment } from './../graphql/comments/resolvers/Comment';
import    { EventLog } from './../graphql/logs/resolvers/EventLog';
import    { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import    { Message } from './../graphql/agents/resolvers/Message';
import    { Post } from './../graphql/posts/resolvers/Post';
import    { Profile } from './../graphql/users/resolvers/Profile';
import    { SocialLink } from './../graphql/socials/resolvers/SocialLink';
import    { Tip } from './../graphql/tips/resolvers/Tip';
import    { TipByBaker } from './../graphql/tips/resolvers/TipByBaker';
import    { User } from './../graphql/users/resolvers/User';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { getComment: Query_getComment,getComments: Query_getComments,getCreatorTips: Query_getCreatorTips,getIsFollowing: Query_getIsFollowing,getIsLiked: Query_getIsLiked,getPost: Query_getPost,getPostViews: Query_getPostViews,getPosts: Query_getPosts,getProfileViews: Query_getProfileViews,getTargetEvents: Query_getTargetEvents,getTipsByBakerForPost: Query_getTipsByBakerForPost,getTipsForPost: Query_getTipsForPost,getUser: Query_getUser,getUserEvents: Query_getUserEvents,getUserTipsHistory: Query_getUserTipsHistory },
      Mutation: { createComment: Mutation_createComment,createPost: Mutation_createPost,createTip: Mutation_createTip,createUser: Mutation_createUser,hidePost: Mutation_hidePost,humanMessage: Mutation_humanMessage,logAnonymousEvent: Mutation_logAnonymousEvent,logEvent: Mutation_logEvent,toggleFollow: Mutation_toggleFollow,toggleLike: Mutation_toggleLike,updateComment: Mutation_updateComment,updatePost: Mutation_updatePost,updateUser: Mutation_updateUser },
      Subscription: { onAiMessage: Subscription_onAiMessage },
      AgentOutput: AgentOutput,
BaseContent: BaseContent,
Comment: Comment,
EventLog: EventLog,
MediaAttachment: MediaAttachment,
Message: Message,
Post: Post,
Profile: Profile,
SocialLink: SocialLink,
Tip: Tip,
TipByBaker: TipByBaker,
User: User,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver,
Timestamp: TimestampResolver
    }