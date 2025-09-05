import { Post, User } from '../../schema/types';

export type FirestoreUser = User & { keywords: string[] };
export type FirestorePost = Post & { keywords: string[] };
