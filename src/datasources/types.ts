import type { CollectionDAO } from '../externals/firebase/firestore';

export interface FireStore {
  fs: <T>(collection: string) => CollectionDAO<T>;
}
