import type { UserProfile } from '@/externals/prisma';
import type { CreateUserInput, UpdateUserInput, User, UserByIdentifierInput } from '@/schema/types';

import { ServiceManager } from './manager';

type CreateProfileDTO = CreateUserInput & Pick<User, 'email'>;
type UpdateProfileDTO = UpdateUserInput & Pick<User, 'id'>;

export class UsersService extends ServiceManager {
  /** Create a new user via Cloud Function */
  async createUser(input: CreateProfileDTO): Promise<UserProfile> {
    const { socialLinks, ...userData } = input;
    const { email, address, displayName, ...profile } = userData;

    const user = await this.ds.Users.create({
      email,
      address,
      displayName,
      profile,
    });

    // create socials and assoc with user
    if (socialLinks !== undefined)
      await this.ds.Social.batchCreate({
        platforms: input?.socialLinks ?? [],
        userId: user.id,
      });

    // append social links to the output
    return user;
  }

  /** Update current user via Cloud Function */
  async updateUser(input: UpdateProfileDTO): Promise<UserProfile> {
    const { socialLinks, ...userData } = input;
    const { id: userId, displayName: name, ...profile } = userData;
    const { username, bio, picture, cover } = profile;

    const user = await this.ds.Users.update({
      userId,
      displayName: name ?? undefined,
      profile: {
        ...(username && { username }),
        ...(picture && { picture }),
        ...(cover && { cover }),
        ...(bio && { bio }),
      },
    });

    // update socials and assoc with user
    if (socialLinks !== undefined) {
      // batch update recreation strategy
      await this.ds.Social.batchDelete({ userId: user.id });
      await this.ds.Social.batchCreate({
        platforms: input?.socialLinks ?? [],
        userId: user.id,
      });
    }

    return user;
  }

  /** Read operations directly against the datasource */
  getUser(input: UserByIdentifierInput): Promise<UserProfile | null> {
    // mutual-exclusion filtering, only one identifier is used during
    return this.ds.Users.getUser(input);
  }
}
