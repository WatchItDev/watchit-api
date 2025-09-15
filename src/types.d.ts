import type { DataSourcesType } from '@/datasources';
import type { ExternalsType } from '@/externals';
import type { ServicesType } from '@/services';
import { User } from '@/schema/types';
import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/use/ws';

export type Disposable = ReturnType<typeof useServer>;

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      WEB3_AUTH_SOCIAL_JWKS: string;
    }
  }

  declare namespace Tools {
    type Override<T, U> = Omit<T, keyof U> & U;
    type Enforce<T, K extends keyof T> = Omit<T, K> & {
      [P in K]-?: NonNullable<T[P]>;
    };
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
}
