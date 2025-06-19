import {MutationResolvers} from "@/schema/types";

export const createPerk: NonNullable<MutationResolvers['createPerk']> =
    (_p,{input},{services}) =>
        services.Perks.createPerk(input);