import {MutationResolvers} from "@/schema/types";

export const updateRank: NonNullable<MutationResolvers['updateRank']> =
    (_p,{id,patch},{services}) =>
        services.Ranks.updateRank(id,patch);