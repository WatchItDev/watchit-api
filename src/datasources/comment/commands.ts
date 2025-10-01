import { CommentContent, Id, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

type PostConnect = Repo.CommentCreateInput['post'];
type ContentCreate = Repo.CommentCreateInput['base'];
type ParentCommentConnect = NonNullable<Repo.CommentCreateInput['parentComment']>;
type ContentUpdate = NonNullable<Repo.CommentUpdateInput['base']>;

export type RepoUpdateComment = Tools.Override<
  Repo.CommentUpdateInput,
  { base: ContentUpdate['update'] }
> &
  Id;

export type RepoCreateComment = Tools.Override<
  Repo.CommentCreateInput,
  {
    base: ContentCreate['create'];
    post: NonNullable<PostConnect['connect']>;
    parentComment?: ParentCommentConnect['connect'];
  }
>;

export class CommentsCommands extends DataSourceManager {
  async create(input: RepoCreateComment): Promise<CommentContent> {
    // content is a base "abstract" table to handle multiple types
    const { base, post, parentComment: parent, body } = input;
    const parentComment = parent ? { connect: { id: parent.id } } : undefined;
    const parentPost = { connect: { id: post.id } };

    return this.pa.comment.create({
      include: { base: true },
      data: {
        body,
        parentComment,
        post: parentPost,
        base: { create: base },
      },
    });
  }

  async update({ id, base, ...patch }: RepoUpdateComment): Promise<CommentContent> {
    // content is a base "abstract" table to handle multiple types
    return this.pa.comment.update({
      where: { id },
      data: { ...patch, base: { update: base } },
      include: { base: true },
    });
  }

  // async hideComment(commentId: string): Promise<void> {
  //   const dao = this.fs<Comment>('comments') as any;
  //   await dao.ref.doc(commentId).update({
  //     hidden: true,
  //     updatedAt: Date.now(),
  //   });
  // }

  // async updateCounterField(
  //   id: string,
  //   field: keyof Pick<Comment, 'repliesCount' | 'likeCount'>,
  //   delta: number,
  // ): Promise<void> {
  //   const dao = (this.fs<Comment>('comments') as any).ref;
  //   await dao.doc(id).update({ [field]: FieldValue.increment(delta) });
  // }
}
