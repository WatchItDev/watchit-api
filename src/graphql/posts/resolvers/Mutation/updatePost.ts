import type { MutationResolvers } from "./../../../../schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const updatePost: NonNullable<MutationResolvers["updatePost"]> =
  requireAuth(async (_parent, { input }, { services }) => {
    return services.Posts.updatePost(input);
  });
