import type { QueryResolvers } from "@/schema/types";
import { requireAuth } from "@/graphql/hof/auth";

export const getUserXPHistory: NonNullable<QueryResolvers["getUserXPHistory"]> =
  requireAuth((_p, { address, limit, offset }, { services }) =>
    services.XP.getHistory(address, limit ?? 50, offset ?? 0),
  );
