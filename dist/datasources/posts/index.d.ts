import * as ts_mixer_dist_types_types from 'ts-mixer/dist/types/types';
import { PostsQuery } from './query.js';
import { PostsCommands } from './commands.js';
import '../manager.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import '../../schema/types.js';
import 'graphql';

declare const PostsDS_base: ts_mixer_dist_types_types.Class<any[], PostsQuery & PostsCommands, typeof PostsQuery & typeof PostsCommands>;
declare class PostsDS extends PostsDS_base {
}

export { PostsDS as default };
