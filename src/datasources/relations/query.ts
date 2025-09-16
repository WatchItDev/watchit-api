import { Relation, Repo } from '../../externals/prisma';
import { PaginationInput } from '../../schema/types';
import { DataSourceManager } from '../manager';

export class RelationsQuery extends DataSourceManager {
  async getRelation(where: Repo.RelationWhereUniqueInput): Promise<Relation | null> {
    return this.pa.relation.findUnique({ where });
  }

  async getRelations(where: Repo.RelationWhereInput, page?: PaginationInput): Promise<Relation[]> {
    return this.pa.relation.findMany({
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
      where,
    });
  }
}
