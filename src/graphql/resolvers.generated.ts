/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import { DateResolver, DateTimeResolver, JSONResolver, TimestampResolver } from 'graphql-scalars';
import { Upload } from './_base/resolvers/Upload';
import { AgentOutput } from './agents/resolvers/AgentOutput';
import { Message } from './agents/resolvers/Message';
import { sendHumanMessage as Mutation_sendHumanMessage } from './agents/resolvers/Mutation/sendHumanMessage';
import { onAgentMessage as Subscription_onAgentMessage } from './agents/resolvers/Subscription/onAgentMessage';
import { Comment } from './comment/resolvers/Comment';
import { createComment as Mutation_createComment } from './comment/resolvers/Mutation/createComment';
import { updateComment as Mutation_updateComment } from './comment/resolvers/Mutation/updateComment';
import { getComment as Query_getComment } from './comment/resolvers/Query/getComment';
import { getComments as Query_getComments } from './comment/resolvers/Query/getComments';
import { BaseContent } from './content/resolvers/BaseContent';
import { Edge } from './edge/resolvers/Edge';
import { setEdgeStatus as Mutation_setEdgeStatus } from './edge/resolvers/Mutation/setEdgeStatus';
import { getEdgeStatus as Query_getEdgeStatus } from './edge/resolvers/Query/getEdgeStatus';
import { MediaAttachment } from './post/resolvers/MediaAttachment';
import { createPost as Mutation_createPost } from './post/resolvers/Mutation/createPost';
import { hidePost as Mutation_hidePost } from './post/resolvers/Mutation/hidePost';
import { updatePost as Mutation_updatePost } from './post/resolvers/Mutation/updatePost';
import { Post } from './post/resolvers/Post';
import { getPost as Query_getPost } from './post/resolvers/Query/getPost';
import { getPosts as Query_getPosts } from './post/resolvers/Query/getPosts';
import { Social } from './social/resolvers/Social';
import type { Resolvers } from './types';
import { createUser as Mutation_createUser } from './user/resolvers/Mutation/createUser';
import { updateUser as Mutation_updateUser } from './user/resolvers/Mutation/updateUser';
import { Profile } from './user/resolvers/Profile';
import { getUser as Query_getUser } from './user/resolvers/Query/getUser';
import { User } from './user/resolvers/User';
export const resolvers: Resolvers = {
  Query: {
    getComment: Query_getComment,
    getComments: Query_getComments,
    getEdgeStatus: Query_getEdgeStatus,
    getPost: Query_getPost,
    getPosts: Query_getPosts,
    getUser: Query_getUser,
  },
  Mutation: {
    createComment: Mutation_createComment,
    createPost: Mutation_createPost,
    createUser: Mutation_createUser,
    hidePost: Mutation_hidePost,
    sendHumanMessage: Mutation_sendHumanMessage,
    setEdgeStatus: Mutation_setEdgeStatus,
    updateComment: Mutation_updateComment,
    updatePost: Mutation_updatePost,
    updateUser: Mutation_updateUser,
  },
  Subscription: { onAgentMessage: Subscription_onAgentMessage },
  AgentOutput: AgentOutput,
  BaseContent: BaseContent,
  Comment: Comment,
  Edge: Edge,
  MediaAttachment: MediaAttachment,
  Message: Message,
  Post: Post,
  Profile: Profile,
  Social: Social,
  User: User,
  Upload: Upload,
  Date: DateResolver,
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  Timestamp: TimestampResolver,
};
