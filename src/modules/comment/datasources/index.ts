import type { Store } from '@/modules/types';
import { CommentsCommands } from './commands';
import { CommentsQueries } from './query';

export const CommentDataSource = (store: Store) => ({
  ...CommentsQueries(store),
  ...CommentsCommands(store),
});
