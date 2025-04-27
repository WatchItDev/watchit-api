import type { FireStore } from './types';
import UsersDS    from './users';
import PostsDS    from './posts';
import CommentsDS from './comments';
import SocialDS   from './social';
import FeedsDS    from './feeds';

export const DataSources = (store: FireStore) => ({
    Users:    new UsersDS(store),
    Posts:    new PostsDS(store),
    Comments: new CommentsDS(store),
    Social:   new SocialDS(store),
    Feeds:    new FeedsDS(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
