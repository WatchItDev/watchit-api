/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { Profile as Query_Profile } from './../graphql/users/resolvers/Query/Profile';
import    { CreateProfile as Mutation_CreateProfile } from './../graphql/users/resolvers/Mutation/CreateProfile';
import    { Block } from './../graphql/relations/resolvers/Block';
import    { Comment } from './../graphql/actions/resolvers/Comment';
import    { Conversation } from './../graphql/messaging/resolvers/Conversation';
import    { Follow } from './../graphql/relations/resolvers/Follow';
import    { MediaAttachment } from './../graphql/content/resolvers/MediaAttachment';
import    { Message } from './../graphql/messaging/resolvers/Message';
import    { Mute } from './../graphql/relations/resolvers/Mute';
import    { Post } from './../graphql/content/resolvers/Post';
import    { Reaction } from './../graphql/actions/resolvers/Reaction';
import    { User } from './../graphql/users/resolvers/User';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { DateResolver,DateTimeResolver,JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { Profile: Query_Profile },
      Mutation: { CreateProfile: Mutation_CreateProfile },
      
      Block: Block,
Comment: Comment,
Conversation: Conversation,
Follow: Follow,
MediaAttachment: MediaAttachment,
Message: Message,
Mute: Mute,
Post: Post,
Reaction: Reaction,
User: User,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver
    }