import { Mixin } from "ts-mixer";
import { PostsQuery } from "./query";
import { PostsCommands } from "./commands";
class PostsDS extends Mixin(PostsQuery, PostsCommands) {
}
export {
  PostsDS as default
};
//# sourceMappingURL=index.js.map