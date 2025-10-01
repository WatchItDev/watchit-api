import type { UserId } from '@/types';
import { Repo, UserProfile } from '@/externals/prisma';
import { DataSourceManager } from '../manager';

type ProfileCreatePayload = Repo.ProfileCreateNestedOneWithoutUserInput;
type ProfileUpdatedPayload = Repo.ProfileUpdateOneWithoutUserNestedInput;
export type RepoUpdateUser = Tools.Override<
  Repo.UserUpdateInput,
  { profile: ProfileUpdatedPayload['update'] }
> &
  UserId;
export type RepoCreateUser = Tools.Override<
  Repo.UserCreateInput,
  { profile: ProfileCreatePayload['create'] }
>;

export class UserCommands extends DataSourceManager {
  async create({ profile, ...rest }: RepoCreateUser): Promise<UserProfile> {
    // one-to-one relation is strict in this case create a new user and profile in one transaction
    return this.pa.user.create({
      data: { ...rest, profile: { create: profile } },
      include: { profile: true },
    });
  }

  async update({ userId, profile, ...patch }: RepoUpdateUser): Promise<UserProfile> {
    return this.pa.user.update({
      where: { id: userId },
      include: { profile: true },
      data: {
        ...patch,
        profile: { update: profile },
      },
    });
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
