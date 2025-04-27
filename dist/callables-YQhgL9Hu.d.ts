import * as firebase_functions_v2_https from 'firebase-functions/v2/https';
import { User } from './schema/types.js';

declare const usersCreate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    user: User;
}>, unknown>;
declare const usersUpdate: firebase_functions_v2_https.CallableFunction<any, Promise<{
    user: User;
}>, unknown>;

declare const callables_usersCreate: typeof usersCreate;
declare const callables_usersUpdate: typeof usersUpdate;
declare namespace callables {
  export { callables_usersCreate as usersCreate, callables_usersUpdate as usersUpdate };
}

export { usersUpdate as a, callables as c, usersCreate as u };
