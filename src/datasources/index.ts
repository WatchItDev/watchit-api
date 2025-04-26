import type { FireStore } from './types';
import UsersDS    from './users';
import PostsDS    from './posts';
import CommentsDS from './comments';

export const DataSources = (store: FireStore) => ({
    Users:    new UsersDS(store),
    Posts:    new PostsDS(store),
    Comments: new CommentsDS(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
