import type { MutationResolvers } from "./../../../../schema/types";
import { requireSocial } from "@/graphql/hof/social";

export const createUser: NonNullable<MutationResolvers["createUser"]> =
  requireSocial(async (_parent, { input }, ctx) => {
    return ctx.services.Profile.createProfile({
      ...input,
      email: ctx.user.email,
      id: ctx.user.id,
    });
  });
