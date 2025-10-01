import { Visibility, type Repo } from '@/infra/database';
export type Post = Repo.PostGetPayload<{ include: { base: true } }>;

export type RepoUpdatePost = {
  title?: string;
  body?: string;
  tags?: object;
  active?: boolean;
  visibility?: Visibility;
} & Id;

export type RepoCreatePost = {
  title: string;
  body: string;
  tags?: object;
} & UserId;

export type CreatePostDTO = {
  body: string;
  title: string;
  tags?: object;
} & UserId;
