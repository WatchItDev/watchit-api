/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { DateResolver, DateTimeResolver, JSONResolver, TimestampResolver } from 'graphql-scalars';
import { Upload } from './../graphql/_base/resolvers/Upload';
import { AgentOutput } from './../graphql/agents/resolvers/AgentOutput';
import { Message } from './../graphql/agents/resolvers/Message';
import { humanMessage as Mutation_humanMessage } from './../graphql/agents/resolvers/Mutation/humanMessage';
import { onAiMessage as Subscription_onAiMessage } from './../graphql/agents/resolvers/Subscription/onAiMessage';
import { Comment } from './../graphql/comments/resolvers/Comment';
import { createComment as Mutation_createComment } from './../graphql/comments/resolvers/Mutation/createComment';
import { updateComment as Mutation_updateComment } from './../graphql/comments/resolvers/Mutation/updateComment';
import { getComment as Query_getComment } from './../graphql/comments/resolvers/Query/getComment';
import { getComments as Query_getComments } from './../graphql/comments/resolvers/Query/getComments';
import { BaseContent } from './../graphql/content/resolvers/BaseContent';
import { toggleLike as Mutation_toggleLike } from './../graphql/likes/resolvers/Mutation/toggleLike';
import { getIsLiked as Query_getIsLiked } from './../graphql/likes/resolvers/Query/getIsLiked';
import { EventLog } from './../graphql/logs/resolvers/EventLog';
import { logAnonymousEvent as Mutation_logAnonymousEvent } from './../graphql/logs/resolvers/Mutation/logAnonymousEvent';
import { logEvent as Mutation_logEvent } from './../graphql/logs/resolvers/Mutation/logEvent';
import { getPostViews as Query_getPostViews } from './../graphql/logs/resolvers/Query/getPostViews';
import { getProfileViews as Query_getProfileViews } from './../graphql/logs/resolvers/Query/getProfileViews';
import { getTargetEvents as Query_getTargetEvents } from './../graphql/logs/resolvers/Query/getTargetEvents';
import { getUserEvents as Query_getUserEvents } from './../graphql/logs/resolvers/Query/getUserEvents';
import { MediaAttachment } from './../graphql/posts/resolvers/MediaAttachment';
import { createPost as Mutation_createPost } from './../graphql/posts/resolvers/Mutation/createPost';
import { hidePost as Mutation_hidePost } from './../graphql/posts/resolvers/Mutation/hidePost';
import { updatePost as Mutation_updatePost } from './../graphql/posts/resolvers/Mutation/updatePost';
import { Post } from './../graphql/posts/resolvers/Post';
import { getPost as Query_getPost } from './../graphql/posts/resolvers/Query/getPost';
import { getPosts as Query_getPosts } from './../graphql/posts/resolvers/Query/getPosts';
import { setRelationStatus as Mutation_setRelationStatus } from './../graphql/relations/resolvers/Mutation/setRelationStatus';
import { getRelationStatus as Query_getRelationStatus } from './../graphql/relations/resolvers/Query/getRelationStatus';
import { Relation } from './../graphql/relations/resolvers/Relation';
import { SocialLink } from './../graphql/socials/resolvers/SocialLink';
import { createTip as Mutation_createTip } from './../graphql/tips/resolvers/Mutation/createTip';
import { getCreatorTips as Query_getCreatorTips } from './../graphql/tips/resolvers/Query/getCreatorTips';
import { getTipsByBakerForPost as Query_getTipsByBakerForPost } from './../graphql/tips/resolvers/Query/getTipsByBakerForPost';
import { getTipsForPost as Query_getTipsForPost } from './../graphql/tips/resolvers/Query/getTipsForPost';
import { getUserTipsHistory as Query_getUserTipsHistory } from './../graphql/tips/resolvers/Query/getUserTipsHistory';
import { Tip } from './../graphql/tips/resolvers/Tip';
import { TipByBaker } from './../graphql/tips/resolvers/TipByBaker';
import { createUser as Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import { updateUser as Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import { Profile } from './../graphql/users/resolvers/Profile';
import { getUser as Query_getUser } from './../graphql/users/resolvers/Query/getUser';
import { User } from './../graphql/users/resolvers/User';
import type { Resolvers } from './types';
export const resolvers: Resolvers = {
  Query: {
    getComment: Query_getComment,
    getComments: Query_getComments,
    getCreatorTips: Query_getCreatorTips,
    getIsLiked: Query_getIsLiked,
    getPost: Query_getPost,
    getPostViews: Query_getPostViews,
    getPosts: Query_getPosts,
    getProfileViews: Query_getProfileViews,
    getRelationStatus: Query_getRelationStatus,
    getTargetEvents: Query_getTargetEvents,
    getTipsByBakerForPost: Query_getTipsByBakerForPost,
    getTipsForPost: Query_getTipsForPost,
    getUser: Query_getUser,
    getUserEvents: Query_getUserEvents,
    getUserTipsHistory: Query_getUserTipsHistory,
  },
  Mutation: {
    createComment: Mutation_createComment,
    createPost: Mutation_createPost,
    createTip: Mutation_createTip,
    createUser: Mutation_createUser,
    hidePost: Mutation_hidePost,
    humanMessage: Mutation_humanMessage,
    logAnonymousEvent: Mutation_logAnonymousEvent,
    logEvent: Mutation_logEvent,
    setRelationStatus: Mutation_setRelationStatus,
    toggleLike: Mutation_toggleLike,
    updateComment: Mutation_updateComment,
    updatePost: Mutation_updatePost,
    updateUser: Mutation_updateUser,
  },
  Subscription: { onAiMessage: Subscription_onAiMessage },
  AgentOutput: AgentOutput,
  BaseContent: BaseContent,
  Comment: Comment,
  EventLog: EventLog,
  MediaAttachment: MediaAttachment,
  Message: Message,
  Post: Post,
  Profile: Profile,
  Relation: Relation,
  SocialLink: SocialLink,
  Tip: Tip,
  TipByBaker: TipByBaker,
  User: User,
  Upload: Upload,
  Date: DateResolver,
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  Timestamp: TimestampResolver,
};
