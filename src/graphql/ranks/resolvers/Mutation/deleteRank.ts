import {MutationResolvers} from "@/schema/types";

export const deleteRank: NonNullable<MutationResolvers['deleteRank']> =
    (_p,{id},{services}) =>
        services.Ranks.deleteRank(id);