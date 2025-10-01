import type { Store } from '@/modules/types';
import type { RepoCreateUser, RepoUpdateUser, User } from '@/modules/user/types';

export const UserCommands = (store: Store) => ({
  async create(input: RepoCreateUser): Promise<User> {
    // one-to-one relation is strict in this case create a new user and profile in one transaction
    const { email, address, displayName, username, bio, picture, cover } = input;
    const profile = { username, bio, picture, cover };

    return store.pa.user.create({
      data: { email, address, displayName, profile: { create: profile } },
      include: { profile: true },
    });
  },

  async update(input: RepoUpdateUser): Promise<User> {
    const { userId, displayName, bio, picture, cover } = input;
    const profile = { bio, picture, cover };

    return store.pa.user.update({
      where: { id: userId },
      include: { profile: true },
      data: {
        displayName,
        profile: { update: profile },
      },
    });
  },
});
