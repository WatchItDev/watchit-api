import * as firebase_functions_v2_https from 'firebase-functions/v2/https';
import { Comment } from './schema/types.js';

declare const commentsCreate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    comment: Comment;
}>, unknown>;
declare const commentsUpdate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    comment: Comment | null;
}>, unknown>;
declare const commentsDelete: firebase_functions_v2_https.CallableFunction<any, Promise<{
    success: boolean;
}>, unknown>;

declare const callables_commentsCreate: typeof commentsCreate;
declare const callables_commentsDelete: typeof commentsDelete;
declare const callables_commentsUpdate: typeof commentsUpdate;
declare namespace callables {
  export { callables_commentsCreate as commentsCreate, callables_commentsDelete as commentsDelete, callables_commentsUpdate as commentsUpdate };
}

export { commentsCreate as a, commentsUpdate as b, callables as c, commentsDelete as d };
