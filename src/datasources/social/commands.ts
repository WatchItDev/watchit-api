import type { Repo, UserId } from '../../externals/prisma';
import type { SocialLink } from '../../schema/types';
import { DataSourceManager } from '../manager';

type SocialWithoutUserId = Omit<Repo.SocialsCreateManyInput, 'userId'>;
export type RepoCreateBatchSocials = { platforms: SocialWithoutUserId[] } & UserId;
export type RepoDeleteBatchSocials = UserId; // delete many by user id

export class SocialCommands extends DataSourceManager {
  async batchCreate({ platforms, userId }: RepoCreateBatchSocials): Promise<Repo.BatchPayload> {
    return this.pa.socials.createMany({
      skipDuplicates: true,
      data: platforms.map((social: SocialLink) => ({
        userId,
        ...social,
      })),
    });
  }

  async batchDelete({ userId }: RepoDeleteBatchSocials): Promise<Repo.BatchPayload> {
    return this.pa.socials.deleteMany({ where: { userId } });
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
