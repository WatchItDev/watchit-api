import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getUserFollowing: NonNullable<QueryResolvers['getUserFollowing']>;

export { getUserFollowing };
