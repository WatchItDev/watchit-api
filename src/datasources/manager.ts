import type { FirestoreStore } from './types';

export class DataSourceManager {
  protected fs: FirestoreStore['fs'];

  constructor(protected store: FirestoreStore) {
    this.fs = store.fs;
  }

}
