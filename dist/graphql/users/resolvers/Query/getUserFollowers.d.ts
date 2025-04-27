import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getUserFollowers: NonNullable<QueryResolvers['getUserFollowers']>;

export { getUserFollowers };
