import type { ServiceAccount } from 'firebase-admin';
import { initializeApp, cert, getApp } from 'firebase-admin/app'
import {
    initializeApp as clientInitialize,
    getApps as clientApps,
    getApp as clientApp
} from 'firebase/app'

import { adminKey, clientKey } from './credentials';

const {
    API_FIREBASE_PROJECT_ID,
    API_FIREBASE_DATABASE,
    API_EMULATOR_HOST,
    API_EMULATOR_PORT,
} = process.env


// This is for the Firebase Emulator Suite
if (process.env.NODE_ENV !== 'production') {
    process.env.FIRESTORE_EMULATOR_HOST ??= `${API_EMULATOR_HOST}:${API_EMULATOR_PORT}`;
}

let admin: ReturnType<typeof getApp>
try {
    admin = getApp()
} catch {
    admin = initializeApp({
        credential: cert(adminKey as ServiceAccount),
        projectId: API_FIREBASE_PROJECT_ID,
        databaseURL: API_FIREBASE_DATABASE,
    })
}

const client =
    !clientApps().length
        ? clientInitialize(clientKey)
        : clientApp()

export const App = () => ({
    getAdmin: () => admin,
    getClient: () => client,
    clientKey,
    adminKey,
})
