import { ServiceParams } from '../services/manager.js';
import '../datasources/index.js';
import '../datasources/types.js';
import '../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import '../datasources/users/index.js';
import 'ts-mixer/dist/types/types';
import '../datasources/users/query.js';
import '../datasources/manager.js';
import '../schema/types.js';
import 'graphql';
import '../datasources/users/commands.js';
import '../datasources/posts/index.js';
import '../datasources/posts/query.js';
import '../datasources/posts/commands.js';
import '../datasources/comments/index.js';
import '../datasources/comments/query.js';
import '../datasources/comments/commands.js';
import '../index-Ced-t-wv.js';
import '../externals/firebase/app.js';
import '@firebase/app';
import 'firebase-admin/app';
import '../externals/firebase/functions.js';
import '@firebase/functions';

declare function enhanceFunction<Args extends any[], Result extends object>(fn: (ctx: ServiceParams, ...args: Args) => Promise<Result>): (...params: Args) => Promise<Result>;
declare function enhanceTrigger<E extends any, R = void>(handler: (ctx: ServiceParams, event: E) => Promise<R> | R): (event: E) => Promise<R>;

export { enhanceFunction, enhanceTrigger };
