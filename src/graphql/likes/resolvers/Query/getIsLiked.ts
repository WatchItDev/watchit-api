import type { QueryResolvers } from "@/schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const getIsLiked: NonNullable<QueryResolvers["getIsLiked"]> =
  requireAuth((_p, { targetId }, { services, user }) =>
    services.Likes.isLiked(user.address, targetId),
  );
