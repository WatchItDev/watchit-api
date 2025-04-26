import type { FireStore } from './types';
import UsersDS    from './users';
import PostsDS    from './posts';

export const DataSources = (store: FireStore) => ({
    Users:    new UsersDS(store),
    Posts:    new PostsDS(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
