import {onDocumentCreated, onDocumentUpdated} from 'firebase-functions/v2/firestore'
import { enhanceTrigger } from '../../manager'
import {ServiceParams} from "../../../services/manager";

export const postCreated = onDocumentCreated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds }, event) => {
        const p = await ds.Posts.getPost(event.params.postId)
        const auth = p?.author.address
        if (!auth) {
            console.warn(`postCreated without author on ${event.params.postId}`)
            return
        }
        await ds.Users.updateCounterField(auth, 'publicationsCount', +1)
        console.log(`🔥 postCreated for ${event.params.postId}`)
    })
)

export const postHidden = onDocumentUpdated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds }: ServiceParams, event) => {
        const before = event?.data?.before.data();
        const after  = event?.data?.after.data();

        if (!before?.hidden && after?.hidden) {
            const auth = after.author?.address;
            if (!auth) {
                console.warn(`postHidden without author on ${event.params.postId}`);
                return;
            }

            await ds.Users.updateCounterField(auth, 'publicationsCount', -1);
            console.log(`🔥 postHidden for ${event.params.postId}`);
        }
    })
);
