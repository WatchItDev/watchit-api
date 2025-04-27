import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getUser: NonNullable<QueryResolvers['getUser']>;

export { getUser };
