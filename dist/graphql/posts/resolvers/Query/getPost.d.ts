import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getPost: NonNullable<QueryResolvers['getPost']>;

export { getPost };
