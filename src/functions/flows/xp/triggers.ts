import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger }    from '../../manager';

/**
 * Rank-up when a new XP entry is inserted.
 */
export const xpEntryCreated = onDocumentCreated(
    'xpEntries/{id}',
    enhanceTrigger(async ({ ds, rank, activity }, event) => {
        const snap = event.data; if (!snap) return;
        const { user, amount } = snap.data() as { user: string; amount: number };

        await ds.Users.updateCounterField(user, 'xpBalance', amount);
        if (amount > 0) await ds.Users.updateCounterField(user, 'xpTotal', amount);
        if (amount > 0) await activity.xpGained(user, amount)
        if (amount < 0) await activity.xpBurned(user, Math.abs(amount))

        await rank.maybeRankUp(user);
    }),
);
