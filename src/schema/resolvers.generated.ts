/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { CreateProfile as Mutation_CreateProfile } from './../../graphql/users/schema/resolvers/Mutation/CreateProfile';
import    { Block } from './../../graphql/relations/resolvers/Block';
import    { Comment } from './../../graphql/actions/resolvers/Comment';
import    { Conversation } from './../../graphql/messaging/resolvers/Conversation';
import    { Follow } from './../../graphql/relations/resolvers/Follow';
import    { MediaAttachment } from './../../graphql/content/resolvers/MediaAttachment';
import    { Message } from './../../graphql/messaging/resolvers/Message';
import    { Mute } from './../../graphql/relations/resolvers/Mute';
import    { Post } from './../../graphql/content/resolvers/Post';
import    { Reaction } from './../../graphql/actions/resolvers/Reaction';
import    { User } from './../../graphql/users/schema/resolvers/User';
import    { Date } from './../../graphql/_base/resolvers/Date';
import    { DateTime } from './../../graphql/_base/resolvers/DateTime';
import    { JSON } from './../../graphql/_base/resolvers/JSON';
import    { Upload } from './../../graphql/_base/resolvers/Upload';
    export const resolvers: Resolvers = {
      
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
Date: Date,
DateTime: DateTime,
JSON: JSON,
Upload: Upload
    }