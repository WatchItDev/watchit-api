import { FireStore } from './types.js';
import '../externals/firebase/firestore.js';
import 'firebase-admin/firestore';

declare class DataSourceManager {
    protected store: FireStore;
    protected fs: FireStore['fs'];
    constructor(store: FireStore);
}

export { DataSourceManager };
