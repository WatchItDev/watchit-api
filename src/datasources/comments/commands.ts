import { CommentContent, Id, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

type CommentCreate = Repo.ContentCreateNestedOneWithoutCommentInput;
type CommentUpdate = Repo.ContentUpdateOneRequiredWithoutCommentNestedInput;

export type RepoUpdateComment = Tools.Override<
  Repo.CommentUpdateInput,
  { base: CommentUpdate['update'] }
> &
  Id;

export type RepoCreateComment = Tools.Override<
  Repo.CommentCreateInput,
  { base: CommentCreate['create'] }
>;

export class CommentsCommands extends DataSourceManager {
  async create({ base, ...rest }: RepoCreateComment): Promise<CommentContent> {
    // content is a base "abstract" table to handle multiple types
    return this.pa.comment.create({
      data: { ...rest, base: { create: base } },
      include: { base: true },
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
