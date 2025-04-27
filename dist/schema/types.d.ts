import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

type Maybe<T> = T | null | undefined;
type InputMaybe<T> = T | null | undefined;
type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type EnumResolverSignature<T, AllowedValues = any> = {
    [key in keyof T]?: AllowedValues;
};
type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    Date: {
        input: Date | string;
        output: Date | string;
    };
    /** ISO-8601 Date-Time string (e.g. 2024-04-17T15:22:00.000Z) */
    DateTime: {
        input: Date | string;
        output: Date | string;
    };
    JSON: {
        input: any;
        output: any;
    };
    /** Unix epoch in milliseconds (number). */
    Timestamp: {
        input: Date | string | number;
        output: Date | string | number;
    };
    Upload: {
        input: any;
        output: any;
    };
};
type CacheControlScope = 'PRIVATE' | 'PUBLIC';
/** A comment on a post, or a reply to another comment. */
type Comment = {
    __typename?: 'Comment';
    author: User;
    content: Scalars['String']['output'];
    createdAt: Scalars['Timestamp']['output'];
    id: Scalars['String']['output'];
    likeCount: Scalars['Int']['output'];
    parentComment?: Maybe<Comment>;
    post: Post;
    updatedAt?: Maybe<Scalars['Timestamp']['output']>;
};
type CreateCommentInput = {
    authorAddress: Scalars['String']['input'];
    content: Scalars['String']['input'];
    parentComment?: InputMaybe<Scalars['String']['input']>;
    postId: Scalars['String']['input'];
};
type CreatePostInput = {
    authorAddress: Scalars['String']['input'];
    cid: Scalars['String']['input'];
    description: Scalars['String']['input'];
    media: Array<MediaAttachmentInput>;
    title: Scalars['String']['input'];
    visibility: VisibilitySetting;
};
type FilterInput = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
};
type MediaAttachment = {
    __typename?: 'MediaAttachment';
    cid: Scalars['String']['output'];
    id: Scalars['String']['output'];
    title?: Maybe<Scalars['String']['output']>;
    type: Scalars['String']['output'];
    url?: Maybe<Scalars['String']['output']>;
};
type MediaAttachmentInput = {
    cid: Scalars['String']['input'];
    title?: InputMaybe<Scalars['String']['input']>;
    type: Scalars['String']['input'];
    url?: InputMaybe<Scalars['String']['input']>;
};
type Mutation = {
    __typename?: 'Mutation';
    createComment: Comment;
    createPost: Post;
    createUser: User;
    deleteComment: Scalars['Boolean']['output'];
    deletePost: Scalars['Boolean']['output'];
    incrementPostView: Post;
    updateComment: Comment;
    updatePost: Post;
    updateUser: User;
};
type MutationcreateCommentArgs = {
    input: CreateCommentInput;
};
type MutationcreatePostArgs = {
    input: CreatePostInput;
};
type MutationcreateUserArgs = {
    input: UserInput;
};
type MutationdeleteCommentArgs = {
    commentId: Scalars['String']['input'];
};
type MutationdeletePostArgs = {
    postId: Scalars['String']['input'];
};
type MutationincrementPostViewArgs = {
    postId: Scalars['String']['input'];
};
type MutationupdateCommentArgs = {
    input: UpdateCommentInput;
};
type MutationupdatePostArgs = {
    input: UpdatePostInput;
};
type MutationupdateUserArgs = {
    input: UpdateUserInput;
};
type Post = {
    __typename?: 'Post';
    author: User;
    bookmarkCount: Scalars['Int']['output'];
    cid: Scalars['String']['output'];
    commentCount: Scalars['Int']['output'];
    createdAt: Scalars['Timestamp']['output'];
    description: Scalars['String']['output'];
    id: Scalars['String']['output'];
    likeCount: Scalars['Int']['output'];
    media: Array<MediaAttachment>;
    title: Scalars['String']['output'];
    updatedAt: Scalars['Timestamp']['output'];
    viewCount: Scalars['Int']['output'];
    visibility: VisibilitySetting;
};
type Query = {
    __typename?: 'Query';
    getCommentsByPost: Array<Comment>;
    getPost?: Maybe<Post>;
    getPostsByAuthor: Array<Post>;
    getRepliesByComment: Array<Comment>;
    getUser?: Maybe<User>;
    getUserBookmarks: Array<Post>;
    getUserFollowers: Array<User>;
    getUserFollowing: Array<User>;
    getUsers: Array<User>;
};
type QuerygetCommentsByPostArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    postId: Scalars['String']['input'];
};
type QuerygetPostArgs = {
    id: Scalars['String']['input'];
};
type QuerygetPostsByAuthorArgs = {
    author: Scalars['String']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};
type QuerygetRepliesByCommentArgs = {
    commentId: Scalars['String']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};
type QuerygetUserArgs = {
    address: Scalars['String']['input'];
};
type QuerygetUserBookmarksArgs = {
    address: Scalars['String']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};
type QuerygetUserFollowersArgs = {
    address: Scalars['String']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};
type QuerygetUserFollowingArgs = {
    address: Scalars['String']['input'];
    limit?: InputMaybe<Scalars['Int']['input']>;
};
type QuerygetUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    prefix: Scalars['String']['input'];
};
type SocialLink = {
    __typename?: 'SocialLink';
    platform: Scalars['String']['output'];
    url: Scalars['String']['output'];
};
type SocialLinkInput = {
    platform: Scalars['String']['input'];
    url: Scalars['String']['input'];
};
type UpdateCommentInput = {
    commentId: Scalars['String']['input'];
    content: Scalars['String']['input'];
};
type UpdatePostInput = {
    cid?: InputMaybe<Scalars['String']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    media?: InputMaybe<Array<MediaAttachmentInput>>;
    postId: Scalars['String']['input'];
    title?: InputMaybe<Scalars['String']['input']>;
    visibility?: InputMaybe<VisibilitySetting>;
};
type UpdateUserInput = {
    address: Scalars['String']['input'];
    bio?: InputMaybe<Scalars['String']['input']>;
    coverPicture?: InputMaybe<Scalars['String']['input']>;
    displayName?: InputMaybe<Scalars['String']['input']>;
    profilePicture?: InputMaybe<Scalars['String']['input']>;
    socialLinks?: InputMaybe<Array<SocialLinkInput>>;
    username?: InputMaybe<Scalars['String']['input']>;
};
type User = {
    __typename?: 'User';
    address: Scalars['String']['output'];
    bio: Scalars['String']['output'];
    bookmarksCount: Scalars['Int']['output'];
    coverPicture?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['Timestamp']['output'];
    displayName: Scalars['String']['output'];
    followersCount: Scalars['Int']['output'];
    followingCount: Scalars['Int']['output'];
    profilePicture?: Maybe<Scalars['String']['output']>;
    publicationsCount: Scalars['Int']['output'];
    socialLinks?: Maybe<Array<SocialLink>>;
    updatedAt: Scalars['Timestamp']['output'];
    username: Scalars['String']['output'];
    verified?: Maybe<Scalars['Boolean']['output']>;
};
type UserByInput = {
    address: Scalars['String']['input'];
};
type UserInput = {
    address: Scalars['String']['input'];
    bio: Scalars['String']['input'];
    coverPicture?: InputMaybe<Scalars['String']['input']>;
    displayName: Scalars['String']['input'];
    profilePicture?: InputMaybe<Scalars['String']['input']>;
    socialLinks: Array<SocialLinkInput>;
    username: Scalars['String']['input'];
};
type VisibilitySetting = 'FOLLOWERS_ONLY' | 'PRIVATE' | 'PUBLIC';
type ResolverTypeWrapper<T> = Promise<T> | T;
type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
type NextResolverFn<T> = () => Promise<T>;
type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
type ResolversTypes = {
    CacheControlScope: ResolverTypeWrapper<'PUBLIC' | 'PRIVATE'>;
    Comment: ResolverTypeWrapper<Omit<Comment, 'parentComment' | 'post'> & {
        parentComment?: Maybe<ResolversTypes['Comment']>;
        post: ResolversTypes['Post'];
    }>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    CreateCommentInput: CreateCommentInput;
    CreatePostInput: CreatePostInput;
    Date: ResolverTypeWrapper<Scalars['Date']['output']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
    FilterInput: FilterInput;
    JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
    MediaAttachment: ResolverTypeWrapper<MediaAttachment>;
    MediaAttachmentInput: MediaAttachmentInput;
    Mutation: ResolverTypeWrapper<{}>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    Post: ResolverTypeWrapper<Omit<Post, 'visibility'> & {
        visibility: ResolversTypes['VisibilitySetting'];
    }>;
    Query: ResolverTypeWrapper<{}>;
    SocialLink: ResolverTypeWrapper<SocialLink>;
    SocialLinkInput: SocialLinkInput;
    Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
    UpdateCommentInput: UpdateCommentInput;
    UpdatePostInput: UpdatePostInput;
    UpdateUserInput: UpdateUserInput;
    Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
    User: ResolverTypeWrapper<User>;
    UserByInput: UserByInput;
    UserInput: UserInput;
    VisibilitySetting: ResolverTypeWrapper<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>;
};
/** Mapping between all available schema types and the resolvers parents */
type ResolversParentTypes = {
    Comment: Omit<Comment, 'parentComment' | 'post'> & {
        parentComment?: Maybe<ResolversParentTypes['Comment']>;
        post: ResolversParentTypes['Post'];
    };
    String: Scalars['String']['output'];
    Int: Scalars['Int']['output'];
    CreateCommentInput: CreateCommentInput;
    CreatePostInput: CreatePostInput;
    Date: Scalars['Date']['output'];
    DateTime: Scalars['DateTime']['output'];
    FilterInput: FilterInput;
    JSON: Scalars['JSON']['output'];
    MediaAttachment: MediaAttachment;
    MediaAttachmentInput: MediaAttachmentInput;
    Mutation: {};
    Boolean: Scalars['Boolean']['output'];
    Post: Post;
    Query: {};
    SocialLink: SocialLink;
    SocialLinkInput: SocialLinkInput;
    Timestamp: Scalars['Timestamp']['output'];
    UpdateCommentInput: UpdateCommentInput;
    UpdatePostInput: UpdatePostInput;
    UpdateUserInput: UpdateUserInput;
    Upload: Scalars['Upload']['output'];
    User: User;
    UserByInput: UserByInput;
    UserInput: UserInput;
};
type cacheControlDirectiveArgs = {
    inheritMaxAge?: Maybe<Scalars['Boolean']['input']>;
    maxAge?: Maybe<Scalars['Int']['input']>;
    scope?: Maybe<CacheControlScope>;
};
type cacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = cacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
type CacheControlScopeResolvers = EnumResolverSignature<{
    PRIVATE?: any;
    PUBLIC?: any;
}, ResolversTypes['CacheControlScope']>;
type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
    author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    parentComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
    post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}
interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}
type MediaAttachmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaAttachment'] = ResolversParentTypes['MediaAttachment']> = {
    cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationcreateCommentArgs, 'input'>>;
    createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationcreatePostArgs, 'input'>>;
    createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
    deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteCommentArgs, 'commentId'>>;
    deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeletePostArgs, 'postId'>>;
    incrementPostView?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationincrementPostViewArgs, 'postId'>>;
    updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationupdateCommentArgs, 'input'>>;
    updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationupdatePostArgs, 'input'>>;
    updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
};
type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
    author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    bookmarkCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    cid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    media?: Resolver<Array<ResolversTypes['MediaAttachment']>, ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
    viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    visibility?: Resolver<ResolversTypes['VisibilitySetting'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    getCommentsByPost?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetCommentsByPostArgs, 'postId'>>;
    getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostArgs, 'id'>>;
    getPostsByAuthor?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostsByAuthorArgs, 'author'>>;
    getRepliesByComment?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QuerygetRepliesByCommentArgs, 'commentId'>>;
    getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserArgs, 'address'>>;
    getUserBookmarks?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetUserBookmarksArgs, 'address'>>;
    getUserFollowers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowersArgs, 'address'>>;
    getUserFollowing?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUserFollowingArgs, 'address'>>;
    getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerygetUsersArgs, 'prefix'>>;
};
type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = {
    platform?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
    name: 'Timestamp';
}
interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
    name: 'Upload';
}
type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
    address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    bookmarksCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    coverPicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
    displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    publicationsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    socialLinks?: Resolver<Maybe<Array<ResolversTypes['SocialLink']>>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
type VisibilitySettingResolvers = EnumResolverSignature<{
    FOLLOWERS_ONLY?: any;
    PRIVATE?: any;
    PUBLIC?: any;
}, ResolversTypes['VisibilitySetting']>;
type Resolvers<ContextType = any> = {
    CacheControlScope?: CacheControlScopeResolvers;
    Comment?: CommentResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    JSON?: GraphQLScalarType;
    MediaAttachment?: MediaAttachmentResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Post?: PostResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    SocialLink?: SocialLinkResolvers<ContextType>;
    Timestamp?: GraphQLScalarType;
    Upload?: GraphQLScalarType;
    User?: UserResolvers<ContextType>;
    VisibilitySetting?: VisibilitySettingResolvers;
};
type DirectiveResolvers<ContextType = any> = {
    cacheControl?: cacheControlDirectiveResolver<any, any, ContextType>;
};

export type { CacheControlScope, CacheControlScopeResolvers, Comment, CommentResolvers, CreateCommentInput, CreatePostInput, DateScalarConfig, DateTimeScalarConfig, DirectiveResolverFn, DirectiveResolvers, EnumResolverSignature, Exact, FilterInput, Incremental, InputMaybe, IsTypeOfResolverFn, JSONScalarConfig, MakeEmpty, MakeMaybe, MakeOptional, Maybe, MediaAttachment, MediaAttachmentInput, MediaAttachmentResolvers, Mutation, MutationResolvers, MutationcreateCommentArgs, MutationcreatePostArgs, MutationcreateUserArgs, MutationdeleteCommentArgs, MutationdeletePostArgs, MutationincrementPostViewArgs, MutationupdateCommentArgs, MutationupdatePostArgs, MutationupdateUserArgs, NextResolverFn, Omit, Post, PostResolvers, Query, QueryResolvers, QuerygetCommentsByPostArgs, QuerygetPostArgs, QuerygetPostsByAuthorArgs, QuerygetRepliesByCommentArgs, QuerygetUserArgs, QuerygetUserBookmarksArgs, QuerygetUserFollowersArgs, QuerygetUserFollowingArgs, QuerygetUsersArgs, RequireFields, Resolver, ResolverFn, ResolverTypeWrapper, ResolverWithResolve, Resolvers, ResolversParentTypes, ResolversTypes, Scalars, SocialLink, SocialLinkInput, SocialLinkResolvers, SubscriptionObject, SubscriptionResolveFn, SubscriptionResolver, SubscriptionResolverObject, SubscriptionSubscribeFn, SubscriptionSubscriberObject, TimestampScalarConfig, TypeResolveFn, UpdateCommentInput, UpdatePostInput, UpdateUserInput, UploadScalarConfig, User, UserByInput, UserInput, UserResolvers, VisibilitySetting, VisibilitySettingResolvers, cacheControlDirectiveArgs, cacheControlDirectiveResolver };
