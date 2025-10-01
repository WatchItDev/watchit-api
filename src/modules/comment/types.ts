import { Visibility, type Repo } from '@/infra/database';
export { ContentKind } from '@/infra/database';

export type Comment = Repo.CommentGetPayload<{ include: { base: true } }>;
export type CommentsFilter = Tools.AtLeastOne<
  Id & PostId & UserId & ParentId,
  'id' | 'parentId' | 'postId' | 'userId'
>;

export type RepoUpdateComment = {
  body?: string;
  tags?: object;
  active?: boolean;
  visibility?: Visibility;
} & Id;

export type RepoCreateComment = {
  body: string;
  tags?: object;
  visibility?: Visibility;
} & PostId &
  UserId &
  Partial<ParentId>;

export type CreateCommentDTO = {
  body: string;
  parentId?: number;
  postId: number;
} & UserId;
