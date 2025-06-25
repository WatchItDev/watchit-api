import {MutationResolvers} from "@/schema/types";
import {requireAuth} from "@/graphql/hof/auth";

export const updatePerk: NonNullable<MutationResolvers['updatePerk']> = requireAuth(
    (_p,{id,patch},{services}) =>
        services.Perks.updatePerk(id,patch)
);