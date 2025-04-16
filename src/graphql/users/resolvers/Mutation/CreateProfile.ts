
import type { MutationResolvers } from './../../../../schema/types';
export const CreateProfile: NonNullable<MutationResolvers['CreateProfile']> = async (_parent, _arg, _ctx) => {
        return _ctx.services.Profile.createProfile(_arg.input);
};