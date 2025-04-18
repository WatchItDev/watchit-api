import { fs } from '@/externals/firebase/firestore';

export class DataSourceManager {
  constructor(protected store: any) {}

  protected fs = fs;
}
