import type { QueryResolvers } from "@/schema/types";

export const getCreatorTips: NonNullable<QueryResolvers["getCreatorTips"]> = (
  _p,
  { address, limit },
  { services },
) => services.Tips.getCreatorTips(address, limit ?? 100) as any;
