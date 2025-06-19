import {MutationResolvers} from "@/schema/types";

export const deletePerk: NonNullable<MutationResolvers['deletePerk']> =
    (_p,{id},{services}) =>
        services.Perks.deletePerk(id);