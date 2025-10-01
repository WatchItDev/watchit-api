import type { Comment, RepoCreateComment, RepoUpdateComment } from '@/modules/comment/types';
import { ContentKind } from '@/modules/comment/types';
import type { Store } from '@/modules/types';

export const CommentsCommands = (store: Store) => ({
  async create(input: RepoCreateComment): Promise<Comment> {
    // content is a base "abstract" table to handle multiple types
    const { userId, postId, parentId, body, tags } = input;
    const base = { userId, tags, kind: ContentKind.COMMENT };
    const parentComment = parentId ? { connect: { id: parentId } } : undefined;
    const parentPost = { connect: { id: postId } };

    return store.pa.comment.create({
      include: { base: true },
      data: {
        body,
        parentComment,
        post: parentPost,
        base: { create: base },
      },
    });
  },

  async update(input: RepoUpdateComment): Promise<Comment> {
    // content is a base "abstract" table to handle multiple types
    const { id, body, tags, active, visibility } = input;
    const base = { tags, active, visibility };

    return store.pa.comment.update({
      where: { id },
      data: { body, base: { update: base } },
      include: { base: true },
    });
  },
});
