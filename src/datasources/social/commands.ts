import type { UserId } from '@/types';
import type { Repo } from '@/externals/prisma';
import type { Social } from '@/graphql/types';
import { DataSourceManager } from '../manager';

type SocialWithoutUserId = Omit<Repo.SocialCreateManyInput, 'userId'>;
export type RepoCreateBatchSocial = { platforms: SocialWithoutUserId[] } & UserId;
export type RepoDeleteBatchSocial = UserId; // delete many by user id

export class SocialCommands extends DataSourceManager {
  async batchCreate({ platforms, userId }: RepoCreateBatchSocial): Promise<Repo.BatchPayload> {
    return this.pa.social.createMany({
      skipDuplicates: true,
      data: platforms.map((social: Social) => ({
        userId,
        ...social,
      })),
    });
  }

  async batchDelete({ userId }: RepoDeleteBatchSocial): Promise<Repo.BatchPayload> {
    return this.pa.social.deleteMany({ where: { userId } });
  }

  // async updateCounterField(
  //   address: string,
  //   field: User,
  //     | 'followersCount'
  //     | 'followingCount'
  //     | 'publicationsCount'
  //     | 'bookmarksCount'
  //     | 'xpBalance'
  //     | 'xpTotal'
  //   >,
  //   delta: number,
  // ): Promise<void> {
  //   const dao = this.fs<User>('users') as any;
  //   await dao.ref.doc(address).update({ [field]: FieldValue.increment(delta) });
  // }
}
