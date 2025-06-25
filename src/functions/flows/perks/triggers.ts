import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger } from '../../manager';

export const unlockedPerkCreated = onDocumentCreated(
    'userPerkState/{id}',
    enhanceTrigger(async ({ perk }, e) => {
        const { perkId, user } = e.data!.data() as { perkId: string; user: string };
        await perk.maybeAutoApply(perkId, user);
    }),
);

export const unlockedPerkClaimed = onDocumentUpdated(
    'userPerkState/{id}',
    enhanceTrigger(async ({ perk, ds }, e) => {
        const before = e.data!.before.data()
        const after  = e.data!.after.data()
        if (before.collectedAt || !after.collectedAt) return

        const meta = (await ds.Perks.getCatalog())
            .find((p: any) => p.id === after.perkId)
        if (!meta || meta.executionRule.type === 'IMMEDIATE') return

        await perk.claim(after.perkId, after.user)
    }),
)
