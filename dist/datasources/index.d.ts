import { FireStore } from './types.js';
import UsersDS from './users/index.js';
import PostsDS from './posts/index.js';
import CommentsDS from './comments/index.js';
import '../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import 'ts-mixer/dist/types/types';
import './users/query.js';
import './manager.js';
import '../schema/types.js';
import 'graphql';
import './users/commands.js';
import './posts/query.js';
import './posts/commands.js';
import './comments/query.js';
import './comments/commands.js';

declare const DataSources: (store: FireStore) => {
    Users: UsersDS;
    Posts: PostsDS;
    Comments: CommentsDS;
};
type DataSourcesType = ReturnType<typeof DataSources>;

export { DataSources, type DataSourcesType };
