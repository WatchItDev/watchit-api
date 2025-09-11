import { Repo, UserProfile } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

export class UsersQuery extends DataSourceManager {
  async getUser(where: Repo.UserWhereUniqueInput): Promise<UserProfile | null> {
    return this.pa.user.findUnique({
      include: { profile: true },
      where,
    });
  }
}
