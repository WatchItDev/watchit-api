import type { CommentResolvers } from "./../../../schema/types";

export const Comment: CommentResolvers = {
  author: (c, _args, { services }) =>
    services.Profile.getProfile(c.author.address),
  post: (c, _args, { services }) => services.Posts.getPost(c.post.id),
  parentComment: (c, _args, { services }) => {
    if (!c.parentComment) return null;
    return services.Comments.getComment(c.parentComment?.id);
  },
};
