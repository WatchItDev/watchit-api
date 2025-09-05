import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { enhanceFunction } from '../manager';
import { FirestoreUser } from '../../externals/firebase/types';

export const logUserCreated = onDocumentCreated(
  'users/{wallet}',
  enhanceFunction(async ({ rank, activity }, event) => {
    const { wallet } = event.params;
    const newUser = event.data!.data() as FirestoreUser;

    console.log(
      `👤  New user ${wallet} created (email: ${newUser.email ?? 'n/a'})`,
    );

    await activity.userRegistered(wallet);
    await rank.maybeRankUp(wallet);

    console.log(`🎉  ${wallet} promoted to watcher & perks seeded`);
  }),
);

export const logUserUpdated = onDocumentUpdated(
  'users/{wallet}',
  enhanceFunction(async ({ activity }, event) => {
    const { wallet } = event.params;

    await activity.userUpdated(wallet);
  }),
);
