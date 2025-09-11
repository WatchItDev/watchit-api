
import type { PostResolvers, ResolversParentTypes } from './../../../schema/types';
import { Content } from '@/externals/prisma';

type PostParent = ResolversParentTypes['Post'] & {
  base: Content;
};

export const Post: PostResolvers<GQL.ContextType, PostParent> = {
  visibility: (p) => p.base.visibility,
  createdAt: (p) => p.base.createdAt,
  active: (p) => p.base.active,
  user: (p, _a, { services }) => {
    return services.Users.getUser({
      id: p.base.userId,
    })
  }
};