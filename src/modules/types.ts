import type { FireStore } from '@/externals/firebase';
import type { PrismaClient } from '@/infra/database';

export interface Store {
  fs: FireStore;
  pa: PrismaClient;
}

export interface Context {
  ds: DataSourcesType;
  ext: ExternalsType;
}
