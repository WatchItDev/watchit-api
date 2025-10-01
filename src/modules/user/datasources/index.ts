import { Store } from '@/modules/types';
import { UserCommands } from './commands';
import { UserQueries } from './query';

export const UserDataSource = (store: Store) => ({
  ...UserQueries(store),
  ...UserCommands(store),
});

export type UsersDsType = ReturnType<typeof UserDataSource>;
