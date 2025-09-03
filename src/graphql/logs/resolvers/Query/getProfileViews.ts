import type { QueryResolvers } from "@/schema/types";

export const getProfileViews: NonNullable<QueryResolvers["getProfileViews"]> = (
  _p,
  { address },
  { services },
) => services.Logs.countProfileViews(address);
