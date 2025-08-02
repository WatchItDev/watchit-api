import {MutationResolvers} from "@/schema/types";
import {requireAuth} from "@/graphql/hof/auth";

export const claimPerk: NonNullable<MutationResolvers['claimPerk']> = requireAuth(
    (_p,{perkId},{services, user}) =>
        services.Perks.claim(user.address, perkId)
);