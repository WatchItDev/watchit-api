import * as firebase_functions_core from 'firebase-functions/core';
import * as firebase_functions_v2_firestore from 'firebase-functions/v2/firestore';

declare const postCreated: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.QueryDocumentSnapshot | undefined, {
    postId: string;
}>>;
declare const postDeleted: firebase_functions_core.CloudFunction<firebase_functions_v2_firestore.FirestoreEvent<firebase_functions_v2_firestore.QueryDocumentSnapshot | undefined, {
    postId: string;
}>>;

declare const triggers_postCreated: typeof postCreated;
declare const triggers_postDeleted: typeof postDeleted;
declare namespace triggers {
  export { triggers_postCreated as postCreated, triggers_postDeleted as postDeleted };
}

export { postDeleted as a, postCreated as p, triggers as t };
