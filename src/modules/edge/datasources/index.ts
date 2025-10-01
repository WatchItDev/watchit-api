import type { Store } from '@/modules/types';
import { EdgeCommands } from './commands';
import { EdgeQueries } from './query';

export const EdgeDataSource = (store: Store) => ({
  ...EdgeQueries(store),
  ...EdgeCommands(store),
});
