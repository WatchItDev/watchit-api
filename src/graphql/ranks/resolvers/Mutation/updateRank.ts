import { MutationResolvers } from "@/schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const updateRank: NonNullable<MutationResolvers["updateRank"]> =
  requireAuth((_p, { id, patch }, { services }) =>
    services.Ranks.updateRank(id, patch),
  );
