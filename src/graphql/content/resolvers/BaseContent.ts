import type { BaseContentResolvers } from './../../../schema/types';
export const BaseContent: BaseContentResolvers = {
  /* Implement BaseContent resolver logic here */
  user: async (p, _a, { dataSources }) => {
    return dataSources.User.getUserOrThrow({
      id: p.userId,
    });
  },
  visibility: async (p, _arg, _ctx) => {
    return p.visibility;
  },
    active: ({ active }, _arg, _ctx) => {
                        /* BaseContent.active resolver is required because BaseContent.active and BaseContentMapper.active are not compatible */
                        return active
                      },
    createdAt: ({ createdAt }, _arg, _ctx) => {
                        /* BaseContent.createdAt resolver is required because BaseContent.createdAt and BaseContentMapper.createdAt are not compatible */
                        return createdAt
                      }
};
