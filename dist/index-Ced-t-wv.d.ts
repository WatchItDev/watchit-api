import { App } from './externals/firebase/app.js';
import { FireStore } from './externals/firebase/firestore.js';
import { Functions } from './externals/firebase/functions.js';

declare const Externals_App: typeof App;
declare const Externals_FireStore: typeof FireStore;
declare const Externals_Functions: typeof Functions;
declare namespace Externals {
  export { Externals_App as App, Externals_FireStore as FireStore, Externals_Functions as Functions };
}

export { Externals as E };
