import {MutationResolvers} from "@/schema/types";

export const claimPerk: NonNullable<MutationResolvers['claimPerk']> =
    (_p,{perkId},{services, user}) =>
        services.Perks.claim(user.address, perkId);