import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger } from "../../manager";
import { FirestoreUser } from "../../../externals/firebase/types";
import { makeXpEntry, XpAction } from "../../../models/xp";

export const logUserCreated = onDocumentCreated(
    'users/{wallet}',
    enhanceTrigger(async ({ ds }, event) => {
        const { wallet } = event.params;
        // Get the payload of the newly created user
        const newUser = event.data!.data() as FirestoreUser;
        const beforeBalance = newUser.xpBalance ?? 0;

        // Create and save the XP entry
        const entry = makeXpEntry({
            action:      XpAction.REGISTER_BONUS,
            description: 'User registration',
            amount:      50,
            before:      beforeBalance,
        });
        await ds.XP.addEntry(wallet, entry);

        console.log(`✨ 50 XP awarded to ${wallet} for completing user registration (previous balance: ${beforeBalance})`);
    })
);

export const logUserUpdated = onDocumentUpdated(
    'users/{wallet}',
    (event) => {
        console.log(`🔥 Trigger fired: user ${event.params.wallet} updated`);
    }
);
