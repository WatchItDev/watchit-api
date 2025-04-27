import * as firebase_functions_core from 'firebase-functions/core';
import * as firebase_functions_v2_firestore from 'firebase-functions/v2/firestore';

declare const commentCreated: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.QueryDocumentSnapshot | undefined, {
    commentId: string;
}>>;
declare const commentDeleted: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.QueryDocumentSnapshot | undefined, {
    commentId: string;
}>>;

declare const triggers_commentCreated: typeof commentCreated;
declare const triggers_commentDeleted: typeof commentDeleted;
declare namespace triggers {
  export { triggers_commentCreated as commentCreated, triggers_commentDeleted as commentDeleted };
}

export { commentDeleted as a, commentCreated as c, triggers as t };
