import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { App } from './app';

/**
 * Thin wrapper around Firebase callable Cloud Functions.
 * Every service writes through this – never directly to Firestore.
 */

export const Functions = () => {
    const fn = getFunctions(App().getClient(), 'auto');
    connectFunctionsEmulator(fn, '127.0.0.1', 5001);

    return {
        users: {
            create: httpsCallable(fn, 'usersCallable-usersCreate'),
            update: httpsCallable(fn, 'usersCallable-usersUpdate'),
        },
    };
};
