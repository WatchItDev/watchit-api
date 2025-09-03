import type { MutationResolvers } from "./../../../../schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const updateComment: NonNullable<MutationResolvers["updateComment"]> =
  requireAuth(async (_parent, { input }, { services }) => {
    return services.Comments.updateComment(input);
  });
