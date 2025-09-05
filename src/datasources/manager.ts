import type { FireStore } from './types';

export class DataSourceManager {
  protected fs: FireStore['fs'];

  constructor(protected store: FireStore) {
    this.fs = store.fs;
  }
}
