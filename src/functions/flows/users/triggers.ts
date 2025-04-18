import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';

export const logUserCreated = onDocumentCreated(
    'users/{wallet}',
    (event) => {
        console.log(`🔥 Trigger fired: user ${event.params.wallet} created`);
    }
);

export const logUserUpdated = onDocumentUpdated(
    'users/{wallet}',
    (event) => {
        console.log(`🔥 Trigger fired: user ${event.params.wallet} updated`);
    }
);
