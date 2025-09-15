import { PostContent, Repo } from '../../externals/prisma';
import { DataSourceManager } from '../manager';

export class PostsQuery extends DataSourceManager {
  async getPost(where: Repo.PostWhereUniqueInput): Promise<PostContent | null> {
    return this.pa.post.findUnique({
      include: { base: true },
      where,
    });
  }

  async getPostOrThrow(where: Repo.PostWhereUniqueInput): Promise<PostContent> {
    return this.pa.post.findUniqueOrThrow({
      include: { base: true },
      where,
    });
  }
  // getPosts = async (q: string, limit = 50): Promise<Post[]> => {
  //   if (!q) return [];
  //   return this.fs<Post>('posts').search(q, limit, true);
  // };
}
