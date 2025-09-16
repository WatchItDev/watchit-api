import { Relation, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

type RelationUpsert = Repo.RelationUpsertArgs['create'];

export class RelationsCommands extends DataSourceManager {
  upsert(where: Repo.RelationWhereUniqueInput, data: RelationUpsert): Promise<Relation> {
    return this.pa.relation.upsert({ where, update: { ...data }, create: { ...data } });
  }

  delete(where: Repo.RelationWhereUniqueInput): Promise<Relation> {
    return this.pa.relation.delete({ where });
  }
}
