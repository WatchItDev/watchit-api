import { CommentDataSource } from './comment/datasources';
import { EdgeDataSource } from './edge/datasources';
import { PostDataSource } from './post/datasources';
import { SocialDataSource } from './social/datasources';
import { Store } from './types';
import { UserDataSource } from './user/datasources';

export const DataSources = (store: Store) => ({
  User: UserDataSource(store),
  Post: PostDataSource(store),
  Comment: CommentDataSource(store),
  Social: SocialDataSource(store),
  // Bookmarks: new BookmarksDs(store),
  Edge: EdgeDataSource(store),
  // Likes: new LikesDs(store),
  // Web3: new Web3Ds(store),
  // Logs: new LogsDs(store),
});
