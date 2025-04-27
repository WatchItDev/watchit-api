import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getUserBookmarks: NonNullable<QueryResolvers['getUserBookmarks']>;

export { getUserBookmarks };
