import { Edge, Repo } from '../../externals/prisma';
import { PaginationInput } from '../../schema/types';
import { DataSourceManager } from '../manager';

export class EdgeQueries extends DataSourceManager {
  async getEdge(where: Repo.EdgeWhereUniqueInput): Promise<Edge | null> {
    return this.pa.edge.findUnique({ where });
  }

  async getEdges(where: Repo.EdgeWhereInput, page?: PaginationInput): Promise<Edge[]> {
    return this.pa.edge.findMany({
      skip: page?.offset ?? undefined,
      take: page?.limit ?? undefined,
      where,
    });
  }
}
