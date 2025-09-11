import { CommentContent, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

export class CommentsQuery extends DataSourceManager {
  async getComment(where: Repo.CommentWhereUniqueInput): Promise<CommentContent | null> {
    return this.pa.comment.findUnique({
      include: { base: true },
      where,
    });
  }
}
