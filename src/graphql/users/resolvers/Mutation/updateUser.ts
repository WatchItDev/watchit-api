import type { MutationResolvers } from './../../../../schema/types';

export const updateUser: NonNullable<
    MutationResolvers['updateUser']
> = (_parent, { input }, ctx) =>
    ctx.services.Profile.updateProfile(input);
