import type { DataSources } from '@/datasources';
import type { Externals } from '@/externals';
import type { Services } from '@/services';

import { User } from '@/graphql/types';
import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';

declare global {
  export type Id = { id: number };
  export type PostId = { postId: number };
  export type UserId = { userId: number };
  export type ParentId = { parentId: number };

  export type DataSourcesType = ReturnType<typeof DataSources>;
  export type ExternalsType = ReturnType<typeof Externals>;
  export type ServicesType = ReturnType<typeof Services>;

  export type Pagination = {
    limit?: number;
    offset?: number;
  };

  declare namespace NodeJS {
    interface ProcessEnv {
      WEB3_AUTH_SOCIAL_JWKS: string;
    }
  }

  declare namespace Tools {
    type XOR<T, U> = T | U extends object
      ? Exclude<keyof T, keyof U> extends never
        ? never
        : (T & Partial<U>) | (U & Partial<T>)
      : T | U;

    type ExactlyOne<T, Keys extends keyof T = keyof T> = {
      [K in Keys]: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
    }[Keys] &
      Omit<T, Keys>;

    type AtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
      {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
      }[Keys];

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
