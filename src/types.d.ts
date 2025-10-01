import type { DataSourcesType } from '@/datasources';
import type { ExternalsType } from '@/externals';
import type { ServicesType } from '@/services';

import { User } from '@/graphql/types';
import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';

export type Id = { id: number };
export type PostId = { postId: number };
export type UserId = { userId: number };


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
