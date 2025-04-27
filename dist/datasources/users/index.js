import { Mixin } from "ts-mixer";
import { UsersQuery } from "./query";
import { UsersCommands } from "./commands";
class UsersDS extends Mixin(UsersQuery, UsersCommands) {
}
export {
  UsersDS as default
};
//# sourceMappingURL=index.js.map