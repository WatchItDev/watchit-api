import * as ts_mixer_dist_types_types from 'ts-mixer/dist/types/types';
import { UsersQuery } from './query.js';
import { UsersCommands } from './commands.js';
import '../manager.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import '../../schema/types.js';
import 'graphql';

declare const UsersDS_base: ts_mixer_dist_types_types.Class<any[], UsersQuery & UsersCommands, typeof UsersQuery & typeof UsersCommands>;
/**
 * Combine query + commands in a single DataSource
 */
declare class UsersDS extends UsersDS_base {
}

export { UsersDS as default };
