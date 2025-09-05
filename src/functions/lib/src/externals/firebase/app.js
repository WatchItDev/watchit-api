'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.App = void 0;
const app_1 = require('firebase-admin/app');
const app_2 = require('firebase/app');
const credentials_1 = require('./credentials');
const {
  API_FIREBASE_PROJECT_ID,
  API_FIREBASE_DATABASE,
  API_EMULATOR_HOST,
  API_EMULATOR_PORT,
} = process.env;
// This is for the Firebase Emulator Suite
if (process.env.NODE_ENV !== 'production') {
  process.env.FIRESTORE_EMULATOR_HOST ??= `${API_EMULATOR_HOST}:${API_EMULATOR_PORT}`;
}
let admin;
try {
  admin = (0, app_1.getApp)();
} catch {
  admin = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(credentials_1.adminKey),
    projectId: API_FIREBASE_PROJECT_ID,
    databaseURL: API_FIREBASE_DATABASE,
  });
}
const client = !(0, app_2.getApps)().length
  ? (0, app_2.initializeApp)(credentials_1.clientKey)
  : (0, app_2.getApp)();
const App = () => ({
  getAdmin: () => admin,
  getClient: () => client,
  clientKey: credentials_1.clientKey,
  adminKey: credentials_1.adminKey,
});
exports.App = App;
//# sourceMappingURL=app.js.map
