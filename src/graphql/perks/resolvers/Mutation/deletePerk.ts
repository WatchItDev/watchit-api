import { MutationResolvers } from "@/schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const deletePerk: NonNullable<MutationResolvers["deletePerk"]> =
  requireAuth((_p, { id }, { services }) => services.Perks.deletePerk(id));
