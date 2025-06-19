import {MutationResolvers} from "@/schema/types";

export const createRank: NonNullable<MutationResolvers['createRank']> =
    (_p,{input},{services}) =>
        services.Ranks.createRank(input);