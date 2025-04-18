import type { CollectionDAO } from '../externals/firebase/firestore';

export interface FirestoreStore {
    fs: <T>(collection: string) => CollectionDAO<T>;
}
