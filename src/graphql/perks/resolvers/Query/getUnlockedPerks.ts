import { QueryResolvers } from "@/schema/types";

export const getUnlockedPerks: NonNullable<
  QueryResolvers["getUnlockedPerks"]
> = (_p, { address, limit, offset }, { services }) =>
  services.Perks.unlockedByUser(address, limit, offset);
