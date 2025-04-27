import { ServiceManager } from "./manager";
class ProfileService extends ServiceManager {
  /** Create a new user via Cloud Function */
  async createProfile(input) {
    const res = await this.ext.Functions().users.create(input);
    return res.data.user;
  }
  /** Update current user via Cloud Function */
  async updateProfile(input) {
    const res = await this.ext.Functions().users.update(input);
    return res.data.user;
  }
  /** Read operations directly against the datasource */
  getProfile(address) {
    return this.ds.Users.getUser(address);
  }
  getUsers(prefix, limit) {
    return this.ds.Users.getUsers(prefix, limit);
  }
  getFollowers(address) {
    return this.ds.Users.getFollowers(address);
  }
  getFollowing(address) {
    return this.ds.Users.getFollowing(address);
  }
  getPublications(address, limit) {
    return this.ds.Users.getPublications(address, limit);
  }
  getBookmarks(address) {
    return this.ds.Users.getBookmarks(address);
  }
}
export {
  ProfileService
};
//# sourceMappingURL=profile.js.map