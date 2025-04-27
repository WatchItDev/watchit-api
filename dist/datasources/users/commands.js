import { DataSourceManager } from "../manager";
import { makeNewUser } from "../../models/user";
import { FieldValue } from "firebase-admin/firestore";
class UsersCommands extends DataSourceManager {
  async createUser(input) {
    const user = makeNewUser(input);
    await this.fs("users").create(user.address, user);
    return user;
  }
  async updateUser(address, patch) {
    await this.fs("users").update(address, { ...patch, updatedAt: Date.now() });
    return await this.fs("users").get(address);
  }
  async updateCounterField(address, field, delta) {
    const dao = this.fs("users");
    await dao.ref.doc(address).update({ [field]: FieldValue.increment(delta) });
  }
}
export {
  UsersCommands
};
//# sourceMappingURL=commands.js.map