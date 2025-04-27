import { ProfileService } from './profile.js';
import { PostService } from './posts.js';
import { CommentService } from './comments.js';
import './manager.js';
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

declare const Services: ({ ds, ext }: {
    ds: any;
    ext: any;
}) => {
    Profile: ProfileService;
    Posts: PostService;
    Comments: CommentService;
};
type ServicesType = ReturnType<typeof Services>;

export { Services, type ServicesType };
