import { ProfileService } from './profile';
import { PostService }    from './posts';
import { CommentService } from './comments';
import { FeedsService }   from './feeds';
import { LikesService }  from './likes';
import { BookmarkService }  from './bookmarks';
import { FollowService }  from './follows';
import { XPService }   from './xp';

export const Services = ({ ds, ext }: { ds: any; ext: any }) => ({
    Profile:  new ProfileService({ ds, ext }),
    Posts:    new PostService({ ds, ext }),
    Comments: new CommentService({ ds, ext }),
    Feeds:    new FeedsService({ ds, ext }),
    Likes:   new LikesService({ ds, ext }),
    Bookmarks:   new BookmarkService({ ds, ext }),
    Follows:   new FollowService({ ds, ext }),
    XP:       new XPService({ ds, ext }),
});

export type ServicesType = ReturnType<typeof Services>;
