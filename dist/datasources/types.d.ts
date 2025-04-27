import { CollectionDAO } from '../externals/firebase/firestore.js';
import 'firebase-admin/firestore';

interface FireStore {
    fs: <T>(collection: string) => CollectionDAO<T>;
}

export type { FireStore };
