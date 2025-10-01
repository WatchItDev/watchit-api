import { Store } from '@/modules/types';
import type { User, UserByIdentifier } from '@/modules/user/types';

export const UserQueries = (store: Store) => ({
  async getUser(where: UserByIdentifier): Promise<User | null> {
    return store.pa.user.findUnique({
      include: { profile: true },
      where,
    });
  },

  async getUserOrThrow(where: UserByIdentifier): Promise<User> {
    return store.pa.user.findUniqueOrThrow({
      include: { profile: true },
      where,
    });
  },
});
