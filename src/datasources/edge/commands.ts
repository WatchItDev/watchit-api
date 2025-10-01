import { Edge, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

type EdgeUpsert = Repo.EdgeUpsertArgs['create'];

export class EdgeCommands extends DataSourceManager {
  upsert(where: Repo.EdgeWhereUniqueInput, data: EdgeUpsert): Promise<Edge> {
    return this.pa.edge.upsert({ where, update: { ...data }, create: { ...data } });
  }

  delete(where: Repo.EdgeWhereUniqueInput): Promise<Edge> {
    return this.pa.edge.delete({ where });
  }
}
