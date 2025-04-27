import UsersDS from "./users";
import PostsDS from "./posts";
import CommentsDS from "./comments";
const DataSources = (store) => ({
  Users: new UsersDS(store),
  Posts: new PostsDS(store),
  Comments: new CommentsDS(store)
});
export {
  DataSources
};
//# sourceMappingURL=index.js.map