import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger } from '../../manager';

export const unlockedPerkCreated = onDocumentCreated(
    'unlockedPerks/{id}',
    enhanceTrigger(async ({ perk }, e) => {
            const { perkId, user } = e.data!.data() as { perkId: string; user: string };
            await perk.maybeAutoApply(perkId, user);
    }),
);

export const unlockedPerkClaimed = onDocumentUpdated(
    'unlockedPerks/{id}',
    enhanceTrigger(async ({ perk }, e) => {
            const before = e.data!.before.data();
            const after  = e.data!.after.data();
            if (!before.collectedAt && after.collectedAt)
                    await perk.claim(after.perkId, after.user);
    }),
);
