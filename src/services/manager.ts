import type { DataSourcesType } from '@/datasources';
import type * as Externals from '@/externals';

export interface ServiceParams {
  ds: DataSourcesType;
  ext: typeof Externals;
}

export class ServiceManager {
  protected ds: DataSourcesType;
  protected ext: typeof Externals;

  constructor(params: ServiceParams) {
    this.ds = params.ds;
    this.ext = params.ext;
  }
}
