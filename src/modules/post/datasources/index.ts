import type { Store } from '@/modules/types';
import { PostCommands } from './commands';
import { PostQueries } from './query';

export const PostDataSource = (store: Store) => ({
  ...PostQueries(store),
  ...PostCommands(store),
});
