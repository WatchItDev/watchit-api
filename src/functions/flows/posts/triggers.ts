import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { enhanceTrigger }                       from '../../manager'

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

export const postDeleted = onDocumentDeleted(
    'posts/{postId}',
    enhanceTrigger(async ({ ds }, event) => {
        const old = event.data?.data();
        const auth = old?.author?.address;
        if (!auth) {
            console.warn(`postDeleted without author on ${event.params.postId}`);
            return;
        }
        await ds.Users.updateCounterField(auth, 'publicationsCount', -1);
        console.log(`🔥 postDeleted for ${event.params.postId}`);
    })
);
