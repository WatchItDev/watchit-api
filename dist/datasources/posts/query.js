import { DataSourceManager } from "../manager";
class PostsQuery extends DataSourceManager {
  async getPost(id) {
    return this.fs("posts").get(id);
  }
  async getPostsByAuthor(author, limit = 20) {
    return this.fs("posts").query([{ field: "author.address", op: "==", value: author }], limit);
  }
  async recentPosts(limit = 20) {
    const dao = this.fs("posts");
    const snap = await dao.ref.orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map((d) => d.data());
  }
  async popularPosts(limit = 20) {
    const dao = this.fs("posts");
    const snap = await dao.ref.orderBy("likeCount", "desc").limit(limit).get();
    return snap.docs.map((d) => d.data());
  }
  async allPosts() {
    return this.fs("posts").list();
  }
}
export {
  PostsQuery
};
//# sourceMappingURL=query.js.map