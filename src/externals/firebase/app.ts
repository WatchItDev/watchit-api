import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import {
  initializeApp as clientInitialize,
  getApps as clientApps,
  getApp as clientApp
} from 'firebase/app'

import adminKey from './credentials/admin.json'
import clientKey from './credentials/client.json'

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE
} = process.env

// This is for the Firebase Emulator Suite
if (process.env.NODE_ENV !== 'production') {
    process.env.FIRESTORE_EMULATOR_HOST ??= '127.0.0.1:8080';
}

export const App = () => {
  const client = !clientApps().length
    ? clientInitialize(clientKey)
    : clientApp()

  const admin = !getApps().length
    ? initializeApp({
        credential: cert(adminKey),
        projectId: FIREBASE_PROJECT_ID,
        databaseURL: FIREBASE_DATABASE
      })
    : getApp()

  return {
    getAdmin: () => admin,
    getClient: () => client,
    clientKey,
    adminKey
  }
}
