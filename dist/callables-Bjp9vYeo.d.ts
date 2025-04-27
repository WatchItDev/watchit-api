import * as firebase_functions_v2_https from 'firebase-functions/v2/https';
import { Post } from './schema/types.js';

declare const postsCreate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    post: Post;
}>, unknown>;
declare const postsUpdate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    post: Post | null;
}>, unknown>;
declare const postsDelete: firebase_functions_v2_https.CallableFunction<any, Promise<{
    success: boolean;
}>, unknown>;
declare const postsIncrementView: firebase_functions_v2_https.CallableFunction<any, Promise<{
    post: Post | null;
}>, unknown>;

declare const callables_postsCreate: typeof postsCreate;
declare const callables_postsDelete: typeof postsDelete;
declare const callables_postsIncrementView: typeof postsIncrementView;
declare const callables_postsUpdate: typeof postsUpdate;
declare namespace callables {
  export { callables_postsCreate as postsCreate, callables_postsDelete as postsDelete, callables_postsIncrementView as postsIncrementView, callables_postsUpdate as postsUpdate };
}

export { postsUpdate as a, postsDelete as b, callables as c, postsIncrementView as d, postsCreate as p };
