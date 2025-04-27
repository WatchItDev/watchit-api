import { initializeApp, cert, getApp } from "firebase-admin/app";
import {
  initializeApp as clientInitialize,
  getApps as clientApps,
  getApp as clientApp
} from "firebase/app";
import adminKey from "./credentials/admin.json";
import clientKey from "./credentials/client.json";
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE,
  EMULATOR_HOST,
  EMULATOR_PORT
} = process.env;
if (false) {
  process.env.FIRESTORE_EMULATOR_HOST ??= `${EMULATOR_HOST}:${EMULATOR_PORT}`;
}
let admin;
try {
  admin = getApp();
} catch {
  admin = initializeApp({
    credential: cert(adminKey),
    projectId: FIREBASE_PROJECT_ID,
    databaseURL: FIREBASE_DATABASE
  });
}
const client = !clientApps().length ? clientInitialize(clientKey) : clientApp();
const App = () => ({
  getAdmin: () => admin,
  getClient: () => client,
  clientKey,
  adminKey
});
export {
  App
};
//# sourceMappingURL=app.js.map