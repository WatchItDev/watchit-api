import type { FireStore } from './types';
import UsersDS    from './users';
import PostsDS    from './posts';
import CommentsDS from './comments';
import FeedsDS    from './feeds';
import BookmarksDS   from './bookmarks';
import FollowsDS   from './follows';
import LikesDS   from './likes';
import XPDS    from './xp';
import SynapseDS    from './synapse';

export const DataSources = (store: FireStore) => ({
    Users:     new UsersDS(store),
    Posts:     new PostsDS(store),
    Comments:  new CommentsDS(store),
    Feeds:     new FeedsDS(store),
    Bookmarks: new BookmarksDS(store),
    Follows:   new FollowsDS(store),
    Likes:     new LikesDS(store),
    XP:        new XPDS(store),
    SynapseDS: new SynapseDS(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
