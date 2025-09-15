import { CommentService } from './comments';
import { PostService } from './posts';
import { UsersService } from './users';

import { LikesService } from './likes';
import { BookmarkService } from './lists';
import { LogService } from './logs';
import { FollowService } from './reactions';
import { TipsService } from './tips';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
  Users: new UsersService({ ds, ext }),
  Posts: new PostService({ ds, ext }),
  Comments: new CommentService({ ds, ext }),
  Likes: new LikesService({ ds, ext }),
  Bookmarks: new BookmarkService({ ds, ext }),
  Follows: new FollowService({ ds, ext }),
  Logs: new LogService({ ds, ext }),
  Tips: new TipsService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
