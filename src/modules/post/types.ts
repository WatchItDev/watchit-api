import { Visibility, type Repo } from '@/infra/database';
export type Post = Repo.PostGetPayload<{ include: { base: true } }>;
export type PostFilter = Partial<UserId>;

export type RepoUpdatePost = Tools.AtLeastOne<{
  title?: string;
  body?: string;
  tags?: object;
  active?: boolean;
  visibility?: Visibility;
}, "title" | "body"> & Id;

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
