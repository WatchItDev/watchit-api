import type { MutationResolvers } from "./../../../../schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const hideComment: NonNullable<MutationResolvers["hideComment"]> =
  requireAuth(async (_parent, { commentId }, { services }) => {
    await services.Comments.hideComment(commentId);
    return true;
  });
