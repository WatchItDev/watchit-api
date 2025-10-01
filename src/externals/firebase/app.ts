import type { ServiceAccount } from 'firebase-admin';
import { cert, getApp, initializeApp } from 'firebase-admin/app';
import {
  getApp as clientApp,
  getApps as clientApps,
  initializeApp as clientInitialize,
} from 'firebase/app';

import { adminKey, clientKey } from './credentials';

const {
  API_FIREBASE_PROJECT_ID,
  API_FIREBASE_DATABASE,
  API_EMULATOR_HOST,
  API_EMULATOR_PORT,
  API_FIRESTORE_BUCKET_URL,
} = process.env;

// This is for the Firebase Emulator Suite
if (process.env.NODE_ENV !== 'production') {
  process.env.FIRESTORE_EMULATOR_HOST ??= `${API_EMULATOR_HOST}:${API_EMULATOR_PORT}`;
}

let admin: ReturnType<typeof getApp>;

try {
  admin = getApp();
} catch {
  admin = initializeApp({
    credential: cert(adminKey as ServiceAccount),
    projectId: API_FIREBASE_PROJECT_ID,
    databaseURL: API_FIREBASE_DATABASE,
    storageBucket: API_FIRESTORE_BUCKET_URL,
  });
}

const client = !clientApps().length ? clientInitialize(clientKey) : clientApp();

export const App = () => ({
  getAdmin: () => admin,
  getClient: () => client,
  clientKey,
  adminKey,
});
