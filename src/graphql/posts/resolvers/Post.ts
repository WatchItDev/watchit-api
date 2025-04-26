import type { PostResolvers, Post as PostType } from '@/schema/types'

export const Post: PostResolvers = {
    author: (p, _a, { services }) => services.Profile.getProfile(p.author.address),

    // comments:   (p, _a, { services }) => services.Comments.getCommentsByPost(p.id),
    // likes:      (p, _a, { services }) => services.Social.getPostLikes(p.id),
    // bookmarks:  (p, _a, { services }) => services.Social.getPostBookmarks(p.id),

    replyTo:  (p, _a, { services }) => p.replyTo  ? services.Posts.getPost(p.replyTo)  : null,
    quoteOf:  (p, _a, { services }) => p.quoteOf  ? services.Posts.getPost(p.quoteOf)  : null,
}
