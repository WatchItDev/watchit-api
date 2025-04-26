import type { PostResolvers, Post as PostType } from '@/schema/types'

export const Post: PostResolvers = {
    author: (p, _a, { services }) => services.Profile.getProfile(p.author.address),
    replyTo:  (p, _a, { services }) => p.replyTo  ? services.Posts.getPost(p.replyTo)  : null,
    quoteOf:  (p, _a, { services }) => p.quoteOf  ? services.Posts.getPost(p.quoteOf)  : null,
}
