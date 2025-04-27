import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getRepliesByComment: NonNullable<QueryResolvers['getRepliesByComment']>;

export { getRepliesByComment };
