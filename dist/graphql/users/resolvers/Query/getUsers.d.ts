import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getUsers: NonNullable<QueryResolvers['getUsers']>;

export { getUsers };
