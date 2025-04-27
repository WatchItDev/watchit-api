import { QueryResolvers } from '../../../../schema/types.js';
import 'graphql';

declare const getPostsByAuthor: NonNullable<QueryResolvers['getPostsByAuthor']>;

export { getPostsByAuthor };
