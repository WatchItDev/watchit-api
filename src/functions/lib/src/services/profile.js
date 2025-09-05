'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileService = void 0;
const manager_1 = require('./manager');
class ProfileService extends manager_1.ServiceManager {
  /** Create a new user via Cloud Function */
  async createProfile(input) {
    return this.ds.Users.createUser(input);
  }
  /** Update current user via Cloud Function */
  async updateProfile(input) {
    return this.ds.Users.updateUser(input.address, input);
  }
  /** Read operations directly against the datasource */
  getProfile(address) {
    return this.ds.Users.getUser(address);
  }
  getUsers(query, limit) {
    return this.ds.Users.getUsers(query, limit);
  }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.js.map
