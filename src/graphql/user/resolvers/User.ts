import type { UserResolvers, User as UserType } from './../../../schema/types';
export const User: UserResolvers = {
  /* Implement User resolver logic here */
  socials(parent: UserType, _, { dataSources }) {
    return dataSources.Social.getSocial({ userId: parent.id });
  },
};
