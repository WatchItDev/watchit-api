import { DataSourceManager } from "../manager";
import type { Post, User } from "../../schema/types";

export class BookmarksQuery extends DataSourceManager {
  isBookmarked(address: string, postId: string) {
    return this.fs("bookmarks").exists(`${address}_${postId}`);
  }

  async getBookmarksByUser(address: string, limit = 50): Promise<Post[]> {
    const rows = await this.fs<{ postId: string }>("bookmarks").query(
      [{ field: "author", op: "==", value: address }],
      { limit },
    );

    if (!rows.length) return [];
    const posts = await Promise.all(
      rows.map((r) => this.fs<Post>("posts").get(r.postId)),
    );
    return posts.filter(Boolean) as Post[];
  }

  async getBookmarksByPost(postId: string, limit = 50): Promise<User[]> {
    const rows = await this.fs<{ author: string }>("bookmarks").query(
      [{ field: "postId", op: "==", value: postId }],
      { limit },
    );

    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs<User>("users").get(r.author)),
    );
    return users.filter(Boolean) as User[];
  }
}
