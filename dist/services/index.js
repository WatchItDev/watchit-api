import { ProfileService } from "./profile";
import { PostService } from "./posts";
import { CommentService } from "./comments";
const Services = ({ ds, ext }) => ({
  Profile: new ProfileService({ ds, ext }),
  Posts: new PostService({ ds, ext }),
  Comments: new CommentService({ ds, ext })
});
export {
  Services
};
//# sourceMappingURL=index.js.map