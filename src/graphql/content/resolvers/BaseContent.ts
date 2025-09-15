import type { BaseContentResolvers } from './../../../schema/types';
export const BaseContent: BaseContentResolvers = {
  /* Implement BaseContent resolver logic here */
  user: async (p, _a, { dataSources }) => {
    return dataSources.Users.getUserOrThrow({
      id: p.userId,
    });
  },
  visibility: async (p, _arg, _ctx) => {
    return p.visibility;
  },
};
