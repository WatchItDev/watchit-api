import { DataSourcesType } from '../datasources/index.js';
import { E as Externals } from '../index-Ced-t-wv.js';
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
import '../externals/firebase/app.js';
import '@firebase/app';
import 'firebase-admin/app';
import '../externals/firebase/functions.js';
import '@firebase/functions';

interface ServiceParams {
    ds: DataSourcesType;
    ext: typeof Externals;
}
declare class ServiceManager {
    protected ds: DataSourcesType;
    protected ext: typeof Externals;
    constructor(params: ServiceParams);
}

export { ServiceManager, type ServiceParams };
