import type { Context } from '@/modules/types';
import type {
  CreateProfileDTO,
  UpdateProfileDTO,
  User,
  UserByIdentifier,
} from '@/modules/user/types';

export const UsersService = (ctx: Context) => ({
  /** Create a new user via Cloud Function */
  async createUser(input: CreateProfileDTO): Promise<User> {
    const { socials, ...data } = input;
    const user = await ctx.ds.User.create(data);

    // create socials and assoc with user
    if (socials !== undefined)
      await ctx.ds.Social.batchCreate({
        platforms: input?.socials ?? [],
        userId: user.id,
      });

    // append social links to the output
    return user;
  },

  /** Update current user via Cloud Function */
  async updateUser(input: UpdateProfileDTO): Promise<User> {
    const { socials, userId, ...userData } = input;

    const user = await ctx.ds.User.update({
      userId,
      ...userData,
    });

    // update socials and assoc with user
    if (socials !== undefined) {
      // batch update recreation strategy
      await ctx.ds.Social.batchDelete({ userId: user.id });
      await ctx.ds.Social.batchCreate({
        platforms: input?.socials ?? [],
        userId: user.id,
      });
    }

    return user;
  },

  /** Read operations directly against the datasource */
  getUser(input: UserByIdentifier): Promise<User | null> {
    // mutual-exclusion filtering, only one identifier is used during
    return ctx.ds.User.getUser(input);
  },
});
