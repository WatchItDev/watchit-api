import { Post, CreatePostInput } from '../schema/types.js';
import 'graphql';

declare function defaultPostData(): Omit<Post, 'id' | 'author' | 'title' | 'description' | 'cid' | 'media' | 'visibility' | 'createdAt' | 'updatedAt'>;
declare function makeNewPost(id: string, authorAddress: string, input: CreatePostInput): Post;

export { defaultPostData, makeNewPost };
