import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { enhanceTrigger } from '../../manager';
import { FirestoreUser } from '../../../externals/firebase/types';
import { processImage } from '../../processors/image';
import { extractCid } from '../../processors/ipfs';

function shouldOptimize(current?: string | null, original?: string | null): boolean {
    const cur = extractCid(current);
    const org = extractCid(original);
    if (!cur) return false;
    if (!org) return true;
    return cur === org;
}

async function buildUserPicturePatch(wallet: string, user: FirestoreUser) {
    const patch: Partial<FirestoreUser> & Record<string, any> = {};
    let changed = false;

    if (shouldOptimize(user.profilePicture, user.profilePictureOriginal)) {
        try {
            const { optimizedUri, originalUri } = await processImage({
                source: user.profilePicture,
                preset: 'profile',
                tag: `user-${wallet}-profile`,
                mode: 'ipfs',
            });
            patch.profilePicture = optimizedUri;
            patch.profilePictureOriginal = originalUri;
            changed = true;
            console.log(`🖼️ optimized profilePicture for ${wallet}`);
        } catch (err) {
            console.warn(`⚠️ optimizing profilePicture failed for ${wallet}:`, err);
        }
    }

    if (shouldOptimize(user.coverPicture, user.coverPictureOriginal)) {
        try {
            const { optimizedUri, originalUri } = await processImage({
                source: user.coverPicture,
                preset: 'cover',
                tag: `user-${wallet}-cover`,
                mode: 'ipfs',
            });
            patch.coverPicture = optimizedUri;
            patch.coverPictureOriginal = originalUri;
            changed = true;
            console.log(`🖼️ optimized coverPicture for ${wallet}`);
        } catch (err) {
            console.warn(`⚠️ optimizing coverPicture failed for ${wallet}:`, err);
        }
    }

    return changed ? patch : null;
}

export const logUserCreated = onDocumentCreated(
    'users/{wallet}',
    enhanceTrigger(async ({ rank, activity }, event) => {
        const { wallet } = event.params;
        const snap = event.data!; // QueryDocumentSnapshot
        const newUser = snap.data() as FirestoreUser;

        console.log(`👤  New user ${wallet} created (email: ${newUser.email ?? 'n/a'})`);

        await activity.userRegistered(wallet);
        await rank.maybeRankUp(wallet);

        console.log(`🎉  ${wallet} promoted to watcher & perks seeded`);

        // try {
        //     const patch = await buildUserPicturePatch(wallet, newUser);
        //     if (patch) {
        //         patch.updatedAt = Date.now();
        //         await snap.ref.update(patch);
        //         console.log(`🖼️ processed user pictures for ${wallet}`);
        //     }
        // } catch (err) {
        //     console.warn(`⚠️ processUserPictures (create) failed for ${wallet}:`, err);
        // }
    }),
);

export const logUserUpdated = onDocumentUpdated(
    'users/{wallet}',
    enhanceTrigger(async ({ activity }, event) => {
        const { wallet } = event.params;
        const change = event.data!; // Change<QueryDocumentSnapshot>
        const after = change.after.data() as FirestoreUser | undefined;
        if (!after) return;

        await activity.userUpdated(wallet);

        // try {
        //     const patch = await buildUserPicturePatch(wallet, after);
        //     if (patch) {
        //         patch.updatedAt = Date.now();
        //         await change.after.ref.update(patch);
        //         console.log(`🖼️ processed user pictures (update) for ${wallet}`);
        //     }
        // } catch (err) {
        //     console.warn(`⚠️ processUserPictures (update) failed for ${wallet}:`, err);
        // }
    }),
);
