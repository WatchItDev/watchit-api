import * as ts_mixer_dist_types_types from 'ts-mixer/dist/types/types';
import { CommentsQuery } from './query.js';
import { CommentsCommands } from './commands.js';
import '../manager.js';
import '../types.js';
import '../../externals/firebase/firestore.js';
import 'firebase-admin/firestore';
import '../../schema/types.js';
import 'graphql';

declare const CommentsDS_base: ts_mixer_dist_types_types.Class<any[], CommentsQuery & CommentsCommands, typeof CommentsQuery & typeof CommentsCommands>;
declare class CommentsDS extends CommentsDS_base {
}

export { CommentsDS as default };
