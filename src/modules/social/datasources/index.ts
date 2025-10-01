import { Store } from '@/modules/types';
import { SocialCommands } from './commands';
import { SocialQueries } from './query';

export const SocialDataSource = (store: Store) => ({
  ...SocialQueries(store),
  ...SocialCommands(store),
});
