import { Repo, Socials } from '../../externals/prisma';
import type { PaginationInput } from '../../schema/types';
import { DataSourceManager } from '../manager';

export class SocialQuery extends DataSourceManager {
  async getSocials(
    input: Repo.SocialsWhereInput,
    pagination?: PaginationInput,
  ): Promise<Socials[]> {
    return this.pa.socials.findMany({
      ...(pagination?.limit && { take: pagination.limit }),
      ...(pagination?.offset && { skip: pagination.offset }),
      where: input,
    });
  }
}
