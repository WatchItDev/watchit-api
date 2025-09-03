import type { QueryResolvers } from "@/schema/types";

export const getTargetEvents: NonNullable<QueryResolvers["getTargetEvents"]> = (
  _p,
  { targetId, targetType, type, limit, offset },
  { services },
) => services.Logs.targetEvents(targetId, targetType, type, limit, offset);
