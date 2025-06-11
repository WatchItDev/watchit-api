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
        const totalBefore   = newUser?.xpTotal   ?? 0

        // Create and save the XP entry
        const entry = makeXpEntry({
            user:        wallet,
            action:      XpAction.REGISTER_BONUS,
            description: 'User registration',
            amount:      50,
            before:      beforeBalance,
            totalBefore,
        })

        await ds.XP.addEntry(entry);

        console.log(`✨ 50 XP awarded to ${wallet} for completing user registration (previous balance: ${beforeBalance})`);

        try {
            const txHash = await ds.SynapseDS.transfer(wallet, 50)
            console.log(`✨ 50 MMC sent to ${wallet}. TxHash: ${txHash}`)
        } catch (err) {
            console.error(`⚠️ Error sending 50 MMC to ${wallet}:`, err)
        }
    })
);

export const logUserUpdated = onDocumentUpdated(
    'users/{wallet}',
    (event) => {
        console.log(`🔥 Trigger fired: user ${event.params.wallet} updated`);
    }
);
