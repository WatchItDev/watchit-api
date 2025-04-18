/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { user as users_Query_user } from './../graphql/users/resolvers/Query/user';
import    { createUser as users_Mutation_createUser } from './../graphql/users/resolvers/Mutation/createUser';
import    { updateUser as users_Mutation_updateUser } from './../graphql/users/resolvers/Mutation/updateUser';
import    { SocialLink } from './../graphql/users/resolvers/SocialLink';
import    { User } from './../graphql/users/resolvers/User';
import    { Upload } from './../graphql/_base/resolvers/Upload';
import    { user as users_Query_user } from './../graphql/users/resolvers/Query/User';
import    { createUser as users_Mutation_createUser } from './../graphql/users/resolvers/Mutation/CreateUser';
import    { updateUser as users_Mutation_updateUser } from './../graphql/users/resolvers/Mutation/UpdateUser';
import    { DateResolver,DateTimeResolver,JSONResolver,TimestampResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { user: users_Query_user,user: users_Query_user },
      Mutation: { createUser: users_Mutation_createUser,updateUser: users_Mutation_updateUser,createUser: users_Mutation_createUser,updateUser: users_Mutation_updateUser },
      
      SocialLink: SocialLink,
User: User,
Upload: Upload,
Date: DateResolver,
DateTime: DateTimeResolver,
JSON: JSONResolver,
Timestamp: TimestampResolver
    }