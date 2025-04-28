import type { MutationResolvers } from '@/schema/types';

export const addXP: NonNullable<MutationResolvers['addXP']> =
    (_p, { input }, { services }) =>
        services.XP.addXP(input);
