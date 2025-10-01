import type { PaginationInput } from '@/graphql/types';
import { Repo, Social } from '@/externals/prisma';
import { DataSourceManager } from '../manager';

export class SocialQueries extends DataSourceManager {
  async getSocial(
    input: Repo.SocialWhereInput,
    pagination?: PaginationInput,
  ): Promise<Social[]> {
    return this.pa.social.findMany({
      ...(pagination?.limit && { take: pagination.limit }),
      ...(pagination?.offset && { skip: pagination.offset }),
      where: input,
    });
  }
}
