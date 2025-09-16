import CommentsDataSource from './comments';
import PostsDataSource from './posts';
import RelationsDataSource from './relations';
import SocialDataSource from './social';
import type { Store } from './types';
import UsersDataSource from './users';

export const DataSources = (store: Store) => ({
  Users: new UsersDataSource(store),
  Posts: new PostsDataSource(store),
  Comments: new CommentsDataSource(store),
  // =Bookmarks: new BookmarksDs(store),
  Relations: new RelationsDataSource(store),
  // Likes: new LikesDs(store),
  // Web3: new Web3Ds(store),
  // Logs: new LogsDs(store),
  Social: new SocialDataSource(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
