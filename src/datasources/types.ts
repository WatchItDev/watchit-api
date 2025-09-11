import type { FireStore } from '../externals/firebase';
import type { PrismaClient } from '../externals/prisma';

export interface Store {
  fs: FireStore;
  pa: PrismaClient;
}
