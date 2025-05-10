import type { MutationResolvers } from './../../../../schema/types';
import {requireAuth} from "@/graphql/hof/auth";

export const updateUser: NonNullable<MutationResolvers['updateUser']> = requireAuth(
    (_parent, { input }, ctx) =>
    ctx.services.Profile.updateProfile({...input, address: ctx.user.address})
);
