import type { PaginationInput } from '@/graphql/types';
import { CommentContent, Repo } from '@/externals/prisma';
import { DataSourceManager } from '../manager';

export class CommentsQuery extends DataSourceManager {
  async getComment(where: Repo.CommentWhereUniqueInput): Promise<CommentContent | null> {
    return this.pa.comment.findUnique({
      include: { base: true },
      where,
    });
  }

  async getCommentOrThrow(where: Repo.CommentWhereUniqueInput): Promise<CommentContent> {
    return this.pa.comment.findUniqueOrThrow({
      include: { base: true },
      where,
    });
  }

  async getComments(
    where: Repo.CommentWhereInput,
    page?: PaginationInput,
  ): Promise<CommentContent[]> {
    return this.pa.comment.findMany({
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
      include: { base: true },
      where,
    });
  }
}
