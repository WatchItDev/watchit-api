import {MutationResolvers} from "@/schema/types";
import {requireAuth} from "@/graphql/hof/auth";

export const createRank: NonNullable<MutationResolvers['createRank']> = requireAuth(
    (_p,{input},{services}) =>
        services.Ranks.createRank(input)
);