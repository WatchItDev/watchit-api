import type { QueryResolvers } from "@/schema/types";

export const getPostViews: NonNullable<QueryResolvers["getPostViews"]> = (
  _p,
  { postId },
  { services },
) => services.Logs.countPostViews(postId);
