import type { FireStore } from './types';
import UsersDS    from './users';
import PostsDS    from './posts';
import CommentsDS from './comments';
import FeedsDS    from './feeds';
import BookmarksDS   from './bookmarks';
import FollowsDS   from './follows';
import LikesDS   from './likes';

export const DataSources = (store: FireStore) => ({
    Users:    new UsersDS(store),
    Posts:    new PostsDS(store),
    Comments: new CommentsDS(store),
    Feeds:    new FeedsDS(store),
    Bookmarks:   new BookmarksDS(store),
    Follows:   new FollowsDS(store),
    Likes:   new LikesDS(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
