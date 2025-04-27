import { DataSourceManager } from "../manager";
class UsersQuery extends DataSourceManager {
  getUser = async (addr) => this.fs("users").get(addr);
  // TODO instead of prefixSearch, use only search and it searches for the username, visibleName, address and bio
  getUsers = async (q, limit = 50) => q.trim() ? this.fs("users").prefixSearch("username", q, limit) : Promise.resolve([]);
  async getFollowers(address, limit = 50) {
    const ids = await this.fs("users").sub(address, "followers").ids(limit);
    return Promise.all(ids.map((id) => this.getUser(id))).then((u) => u.filter(Boolean));
  }
  async getFollowing(address, limit = 50) {
    const ids = await this.fs("users").sub(address, "following").ids(limit);
    return Promise.all(ids.map((id) => this.getUser(id))).then((u) => u.filter(Boolean));
  }
  async getPublications(address, limit = 20) {
    return this.fs("publications").query([{ field: "authorAddress", op: "==", value: address }], limit);
  }
  async getBookmarks(address, limit = 50) {
    const ids = await this.fs("users").sub(address, "bookmarks").ids(limit);
    if (!ids.length) return [];
    const posts = await Promise.all(ids.map((id) => this.fs("posts").get(id)));
    return posts.filter(Boolean);
  }
}
export {
  UsersQuery
};
//# sourceMappingURL=query.js.map