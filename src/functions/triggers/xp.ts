import { log, warn } from 'firebase-functions/logger';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { enhanceFunction } from '../manager';

export const xpEntryCreated = onDocumentCreated(
  'xpEntries/{id}',
  enhanceFunction(async ({ ds, rank, activity }, event) => {
    const snap = event.data;
    if (!snap) {
      warn('[XP_ENTRY_CREATED] No snapshot found for event.');
      return;
    }
    const { user, amount } = snap.data() as { user: string; amount: number };

    log(`[XP_ENTRY_CREATED] Updating xpBalance for user: ${user} by ${amount}`);
    await ds.Users.updateCounterField(user, 'xpBalance', amount);

    if (amount > 0) {
      log(`[XP_ENTRY_CREATED] Increasing xpTotal for user: ${user} by ${amount}`);
      await ds.Users.updateCounterField(user, 'xpTotal', amount);
      log(`[XP_ENTRY_CREATED] Logging xpGained for user: ${user} by ${amount}`);
      await activity.xpGained(user, amount);
    }

    if (amount < 0) {
      log(`[XP_ENTRY_CREATED] Logging xpBurned for user: ${user} by ${Math.abs(amount)}`);
      await activity.xpBurned(user, Math.abs(amount));
    }

    log(`[XP_ENTRY_CREATED] Checking rank up for user: ${user}`);
    await rank.rankUp(user);
  }),
);
