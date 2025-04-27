import { MutationResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const deletePost: NonNullable<MutationResolvers['deletePost']>;

export { deletePost };
