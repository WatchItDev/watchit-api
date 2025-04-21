import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { App } from './app';
import { UpdateUserInput, User, UserInput } from "@/schema/types";

/**
 * Thin wrapper around Firebase callable Cloud Functions.
 * Every service writes through this – never directly to Firestore.
 */

export const Functions = () => {
    const fn = getFunctions(App().getClient(), 'auto');
    const { EMULATOR_HOST } = process.env

    if (process.env.NODE_ENV !== 'production') {
        connectFunctionsEmulator(fn, `${EMULATOR_HOST}`, 5001);
    }

    return {
        users: {
            create: httpsCallable<UserInput, { user: User }>(fn, 'usersCallable-usersCreate'),
            update: httpsCallable<UpdateUserInput & { address: string }, { user: User }>(fn, 'usersCallable-usersUpdate'),
        },
    };
};
