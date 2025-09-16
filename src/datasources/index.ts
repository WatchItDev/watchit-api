import type { Store } from './types';
import CommentsDataSource from './comments';
import RelationDataSource from './relations';
import PostsDataSource from './posts';
import SocialDataSource from './social';
import UsersDataSource from './users';

export const DataSources = (store: Store) => ({
  Users: new UsersDataSource(store),
  Posts: new PostsDataSource(store),
  Comments: new CommentsDataSource(store),
  // =Bookmarks: new BookmarksDs(store),
  Relation: new RelationDataSource(store),
  // Likes: new LikesDs(store),
  // Web3: new Web3Ds(store),
  // Logs: new LogsDs(store),
  Social: new SocialDataSource(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
