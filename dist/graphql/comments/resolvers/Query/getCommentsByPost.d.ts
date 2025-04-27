import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getCommentsByPost: NonNullable<QueryResolvers['getCommentsByPost']>;

export { getCommentsByPost };
