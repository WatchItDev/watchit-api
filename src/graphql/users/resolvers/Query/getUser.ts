import type { QueryResolvers } from "./../../../../schema/types";
import { ensureAuthFieldsOnGetUser } from "@/graphql/hof/ensureAuthFields";

export const getUser: NonNullable<QueryResolvers["getUser"]> =
  ensureAuthFieldsOnGetUser((_parent, { input }, { services }) =>
    services.Profile.getProfile(input.address),
  );
