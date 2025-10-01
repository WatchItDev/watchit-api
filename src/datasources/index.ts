import CommentDataSource from './comment';
import PostDataSource from './post';
import EdgeDataSource from './edge';
import SocialDataSource from './social';
import type { Store } from './types';
import UserDataSource from './user';

export const DataSources = (store: Store) => ({
  User: new UserDataSource(store),
  Post: new PostDataSource(store),
  Comment: new CommentDataSource(store),
  // =Bookmarks: new BookmarksDs(store),
  Edge: new EdgeDataSource(store),
  // Likes: new LikesDs(store),
  // Web3: new Web3Ds(store),
  // Logs: new LogsDs(store),
  Social: new SocialDataSource(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
