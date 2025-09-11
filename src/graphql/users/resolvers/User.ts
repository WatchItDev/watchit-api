import type { UserResolvers, User as UserType } from './../../../schema/types';
export const User: UserResolvers = {
  /* Implement User resolver logic here */
  socialLinks(parent: UserType, _, { dataSources }) {
    return dataSources.Social.getSocials({ userId: parent.id });
  },
};
