import { onCall }         from 'firebase-functions/v2/https';
import { HttpsError }     from 'firebase-functions/v1/https';
import { enhanceFunction } from '../../manager';
import { makeXpEntry }     from '../../../models/xp';
import type { AddXPInput } from '../../../schema/types';

export const addXP = onCall(
    { region: 'us-central1' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { address, action, description, amount } = req.data as AddXPInput;

        if (!amount) throw new HttpsError('invalid-argument', 'amount is 0');

        const user = await ds.Users.getUser(address);
        if (!user) throw new HttpsError('not-found', 'user does not exist');

        const entry = makeXpEntry({
            action,
            description,
            amount,
            before: user.xpBalance ?? 0,
        });

        await ds.XP.addEntry(address, entry);
        return { success: true };
    })
);
