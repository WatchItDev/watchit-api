import type { Id } from '@/datasources/types';
import { PostContent, Repo } from '@/externals/prisma';
import { DataSourceManager } from '../manager';

type ContentCreate = Repo.PostCreateInput['base'];
type ContentUpdate = NonNullable<Repo.PostUpdateInput['base']>;

export type RepoUpdatePost = Tools.Override<
  Repo.PostUpdateInput,
  { base: ContentUpdate['update'] }
> &
  Id;

export type RepoCreatePost = Tools.Override<
  Repo.PostCreateInput,
  { base: ContentCreate['create'] }
>;

export class PostCommands extends DataSourceManager {
  async create({ base, ...rest }: RepoCreatePost): Promise<PostContent> {
    // content is a base "abstract" table to handle multiple types
    return this.pa.post.create({
      data: { ...rest, base: { create: base } },
      include: { base: true },
    });
  }

  async update({ id, base, ...patch }: RepoUpdatePost): Promise<PostContent> {
    // content is a base "abstract" table to handle multiple types
    return this.pa.post.update({
      where: { id },
      data: { ...patch, base: { update: base } },
      include: { base: true },
    });
  }

  // async hidePost(postId: string): Promise<void> {

  // }

  // async updateCounterField(
  //   postId: string,
  //   field: keyof Pick<
  //     Post,
  //     'commentCount' | 'likeCount' | 'bookmarkCount' | 'viewCount'
  //   >,
  //   delta: number,
  // ): Promise<void> {
  //   const dao = this.fs<Post>('posts') as any;
  //   await dao.ref.doc(postId).update({ [field]: FieldValue.increment(delta) });
  // }
}
