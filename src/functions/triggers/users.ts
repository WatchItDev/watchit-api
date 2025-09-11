import { log } from 'firebase-functions/logger';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { FirestoreUser } from '../../externals/firebase/types';
import { enhanceFunction } from '../manager';

export const logUserCreated = onDocumentCreated(
  'users/{wallet}',
  enhanceFunction(async ({ rank, activity }, event) => {
    const { wallet } = event.params;
    const newUser = event.data!.data() as FirestoreUser;

    await activity.userRegistered(wallet);
    await rank.rankUp(wallet);

    log(`[USER_CREATED] New user ${wallet} created (email: ${newUser.email ?? 'n/a'})`);
    log(`[USER_PROMOTED] ${wallet} promoted to watcher & perks seeded`);
  }),
);

export const logUserUpdated = onDocumentUpdated(
  'users/{wallet}',
  enhanceFunction(async ({ activity }, event) => {
    const { wallet } = event.params;

    log(`[USER_UPDATED] User ${wallet} updated`);
    await activity.userUpdated(wallet);
  }),
);
