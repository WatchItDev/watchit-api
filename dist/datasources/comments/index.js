import { Mixin } from "ts-mixer";
import { CommentsQuery } from "./query";
import { CommentsCommands } from "./commands";
class CommentsDS extends Mixin(CommentsQuery, CommentsCommands) {
}
export {
  CommentsDS as default
};
//# sourceMappingURL=index.js.map