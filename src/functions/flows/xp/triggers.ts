import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger }    from '../../manager';

export const xpBalanceUpdater = onDocumentCreated(
    'users/{uid}/xpHistory/{entryId}',
    enhanceTrigger(async ({ ds }, event) => {
        const { uid } = event.params;
        const { amount } = event.data!.data() as { amount: number };

        if (typeof amount !== 'number') return;

        await ds.Users.updateCounterField(uid, 'xpBalance', amount);
        console.log(`⭐️ XP balance updated for ${uid}: Δ ${amount}`);
    })
);
