import {onDocumentCreated, onDocumentUpdated} from 'firebase-functions/v2/firestore'
import {type Ctx, enhanceTrigger} from '../../manager'

export const postCreated = onDocumentCreated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx,'ds' | 'activity'>, event) => {
        const p = await ds.Posts.getPost(event.params.postId)
        const auth = p?.author.address
        if (!auth) {
            console.warn(`postCreated without author on ${event.params.postId}`)
            return
        }
        await ds.Users.updateCounterField(auth, 'publicationsCount', +1)
        await activity.postCreated(p.author.address, event.params.postId)
        console.log(`🔥 postCreated for ${event.params.postId}`)
    })
)

export const postHidden = onDocumentUpdated(
    'posts/{postId}',
    enhanceTrigger(async ({ ds, activity }: Pick<Ctx,'ds' | 'activity'>, event) => {
        const before = event?.data?.before.data();
        const after  = event?.data?.after.data();
        const auth = after?.author?.address;

        if (!before?.hidden && after?.hidden) {
            if (!auth) {
                console.warn(`postHidden without author on ${event.params.postId}`);
                return;
            }

            await ds.Users.updateCounterField(auth, 'publicationsCount', -1);
            console.log(`🔥 postHidden for ${event.params.postId}`);
            await activity.postHidden(auth, event.params.postId)
        }

        await activity.postUpdated(auth, event.params.postId)
    })
);
