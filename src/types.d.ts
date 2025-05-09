import type { DataSourcesType } from '@/datasources';
import type { ServicesType } from '@/services';
import { Request } from "express"

declare namespace NodeJS {
  interface ProcessEnv {
    WEB3_AUTH_SOCIAL_JWKS: string;
  }
}

declare namespace GQL {
  interface ContextType {
    dataSources: DataSourcesType;
    services: ServicesType;
    req: Request
  }
}
