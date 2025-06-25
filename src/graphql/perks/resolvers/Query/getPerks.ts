import {QueryResolvers} from "@/schema/types";

export const getPerks: NonNullable<QueryResolvers['getPerks']> =
    (_p,{},{services}) =>
        services.Perks.catalog();
