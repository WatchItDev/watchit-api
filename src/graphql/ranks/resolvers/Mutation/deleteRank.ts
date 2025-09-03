import { MutationResolvers } from "@/schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const deleteRank: NonNullable<MutationResolvers["deleteRank"]> =
  requireAuth((_p, { id }, { services }) => services.Ranks.deleteRank(id));
