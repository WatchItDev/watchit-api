import {QueryResolvers} from "@/schema/types";

export const getAchievements: NonNullable<QueryResolvers['getAchievements']> =
    (_p,{address},{services}) =>
        services.Ranks.achievements(address);