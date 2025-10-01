import type { Social, SocialFilter } from '@/modules/social/types';
import type { Store } from '@/modules/types';

export const SocialQueries = (store: Store) => ({
  async getSocial(input: SocialFilter, pagination?: Pagination): Promise<Social[]> {
    return store.pa.social.findMany({
      ...(pagination?.limit && { take: pagination.limit }),
      ...(pagination?.offset && { skip: pagination.offset }),
      where: input,
    });
  },
});
