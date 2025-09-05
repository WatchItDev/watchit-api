import type { DataSourcesType } from '@/datasources';
import type { ServicesType } from '@/services';
import type { ExternalsType } from '@/externals';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'express';
import type { JWTPayload } from 'jose';
import { User } from '@/schema/types';

declare namespace NodeJS {
  interface ProcessEnv {
    WEB3_AUTH_SOCIAL_JWKS: string;
  }
}

export interface Address {
  address: string;
}

export interface AuthData {
  id: string;
  email: string;
}

declare namespace GQL {
  interface ContextType {
    pubsub: PubSub;
    dataSources: DataSourcesType;
    services: ServicesType;
    externals: ExternalsType;
    req: Request;
    user: User;
  }
}
