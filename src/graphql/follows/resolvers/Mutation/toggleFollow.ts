import type { MutationResolvers } from "../../../../schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const toggleFollow: NonNullable<MutationResolvers["toggleFollow"]> =
  requireAuth(
    async (_parent, { input: { targetAddress } }, { services, user }) => {
      return await services.Follows.toggleFollow(user.address, targetAddress);
    },
  );
