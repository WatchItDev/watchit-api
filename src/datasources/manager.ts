import type { Store } from './types';

export class DataSourceManager {
  protected fs: Store['fs'];
  protected pa: Store['pa'];

  constructor(store: Store) {
    this.fs = store.fs;
    this.pa = store.pa;
  }
}
