import {MutationResolvers} from "@/schema/types";

export const updatePerk: NonNullable<MutationResolvers['updatePerk']> =
    (_p,{id,patch},{services}) =>
        services.Perks.updatePerk(id,patch);