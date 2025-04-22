import type { MutationResolvers } from './../../../../schema/types';

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_parent, { input }, ctx) => ctx.services.Profile.createProfile(input);
