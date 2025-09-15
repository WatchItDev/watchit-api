import CommentsDs from './comments';
import PostsDs from './posts';
import SocialDs from './social';
import type { Store } from './types';
import UsersDs from './users';

export const DataSources = (store: Store) => ({
  Users: new UsersDs(store),
  Posts: new PostsDs(store),
  Comments: new CommentsDs(store),
  // =Bookmarks: new BookmarksDs(store),
  // Follows: new FollowsDs(store),
  // Likes: new LikesDs(store),
  // Web3: new Web3Ds(store),
  // Logs: new LogsDs(store),
  Social: new SocialDs(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;
