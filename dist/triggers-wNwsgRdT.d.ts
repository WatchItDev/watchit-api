import * as firebase_functions_core from 'firebase-functions/core';
import * as firebase_functions_v2_firestore from 'firebase-functions/v2/firestore';

declare const logUserCreated: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.QueryDocumentSnapshot | undefined, {
    wallet: string;
}>>;
declare const logUserUpdated: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.Change<firebase_functions_v2_firestore.QueryDocumentSnapshot> | undefined, {
    wallet: string;
}>>;

declare const triggers_logUserCreated: typeof logUserCreated;
declare const triggers_logUserUpdated: typeof logUserUpdated;
declare namespace triggers {
  export { triggers_logUserCreated as logUserCreated, triggers_logUserUpdated as logUserUpdated };
}

export { logUserUpdated as a, logUserCreated as l, triggers as t };
