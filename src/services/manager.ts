import type { DataSourcesType } from '@/datasources';
import type * as Externals from '@/externals';
import { Request } from "express"

export interface ServiceParams {
  ds: DataSourcesType;
  ext: typeof Externals;
  req: Request
}

export class ServiceManager {
  protected ds: DataSourcesType;
  protected ext: typeof Externals;
  protected req: Request;

  constructor(params: ServiceParams) {
    this.ds = params.ds;
    this.ext = params.ext;
    this.req = params.req
  }
}
