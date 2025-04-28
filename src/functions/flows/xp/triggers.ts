import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import {enhanceTrigger} from "@/functions/manager";
import type {ServiceParams} from "@/services/manager";

export const xpBalanceUpdater = onDocumentCreated(
    'users/{uid}/xpHistory/{entryId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        // const { uid, entryId } = event.params
        const old = event.data?.data();
        // if (!uid || !entryId) return
        // await ds.Users.updateCounterField(userId, 'bookmarksCount', +1)
        console.log('old', old)
        console.log(`🔖 XP gain`)
    })
)