import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { App } from './app';
import { UpdateUserInput, User, UserInput } from "@/schema/types";

/**
 * Thin wrapper around Firebase callable Cloud Functions.
 * Every service writes through this – never directly to Firestore.
 */

export const Functions = () => {
    const fn = getFunctions(App().getClient(), 'auto');

    if (process.env.NODE_ENV !== 'production') {
        connectFunctionsEmulator(fn, '127.0.0.1', 5001);
    }

    return {
        users: {
            create: httpsCallable<UserInput, { user: User }>(fn, 'usersCallable-usersCreate'),
            update: httpsCallable<UpdateUserInput & { address: string }, { user: User }>(fn, 'usersCallable-usersUpdate'),
        },
    };
};
