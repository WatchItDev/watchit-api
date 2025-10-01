import type { Repo } from '@/infra/database';
import type {
  RepoCreateBatchSocial,
  RepoDeleteBatchSocial,
  SocialPlatform,
} from '@/modules/social/types';
import type { Store } from '@/modules/types';

export const SocialCommands = (store: Store) => ({
  async batchCreate({ platforms, userId }: RepoCreateBatchSocial): Promise<Repo.BatchPayload> {
    return store.pa.social.createMany({
      skipDuplicates: true,
      data: platforms.map((social: SocialPlatform) => ({
        userId,
        ...social,
      })),
    });
  },

  async batchDelete({ userId }: RepoDeleteBatchSocial): Promise<Repo.BatchPayload> {
    return store.pa.social.deleteMany({ where: { userId } });
  },
});
