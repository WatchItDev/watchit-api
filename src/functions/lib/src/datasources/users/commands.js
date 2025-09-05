'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UsersCommands = void 0;
const manager_1 = require('../manager');
const user_1 = require('../../models/user');
const utils_1 = require('../../externals/firebase/utils');
const firestore_1 = require('firebase-admin/firestore');
const USER_PREFIX_FIELDS = ['username', 'displayName', 'bio'];
const USER_WHOLE_FIELDS = ['address'];
class UsersCommands extends manager_1.DataSourceManager {
  async createUser(input) {
    const user = (0, user_1.makeNewUser)(input);
    const keywords = (0, utils_1.buildKeywords)(
      user,
      USER_PREFIX_FIELDS,
      USER_WHOLE_FIELDS,
    );
    const record = { ...user, keywords };
    await this.fs('users').create(user.address, record);
    return user;
  }
  async updateUser(address, patch) {
    const dao = this.fs('users');
    const current = await dao.get(address);
    if (!current) throw new Error(`User ${address} not found`);
    const cleanPatch = (0, utils_1.stripNulls)(patch);
    const merged = { ...current, ...cleanPatch };
    const keywords = (0, utils_1.buildKeywords)(
      merged,
      USER_PREFIX_FIELDS,
      USER_WHOLE_FIELDS,
    );
    const timestamp = Date.now();
    const updateDoc = { ...cleanPatch, keywords, updatedAt: timestamp };
    const { keywords: _k, ...publicUser } = { ...merged, updatedAt: timestamp };
    await dao.update(address, updateDoc);
    return publicUser;
  }
  async updateCounterField(address, field, delta) {
    const dao = this.fs('users');
    await dao.ref
      .doc(address)
      .update({ [field]: firestore_1.FieldValue.increment(delta) });
  }
}
exports.UsersCommands = UsersCommands;
//# sourceMappingURL=commands.js.map
