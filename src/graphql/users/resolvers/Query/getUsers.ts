import type { QueryResolvers } from "./../../../../schema/types";

export const getUsers: NonNullable<QueryResolvers["getUsers"]> = (
  _parent,
  { query, limit },
  { services },
) => services.Profile.getUsers(query, limit);
