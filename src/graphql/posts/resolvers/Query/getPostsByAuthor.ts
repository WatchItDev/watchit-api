import type { QueryResolvers } from './../../../../schema/types'

export const getPostsByAuthor: NonNullable<QueryResolvers['getPostsByAuthor']> =
    (_parent, { author, limit }, { services }) =>
        services.Posts.getPostsByAuthor(author, limit)
