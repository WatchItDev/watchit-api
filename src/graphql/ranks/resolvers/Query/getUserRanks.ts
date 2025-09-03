import { QueryResolvers } from "@/schema/types";

export const getUserRanks: NonNullable<QueryResolvers["getUserRanks"]> = (
  _p,
  { address },
  { services },
) => services.Ranks.userRanks(address);
