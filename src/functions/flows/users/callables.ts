import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { enhanceFunction } from '@/functions/manager';
import { User } from '@/schema/types';

export const usersCreate = onCall({ region: 'auto' },
    enhanceFunction(
        async ({ds}, req): Promise<{ user: User }> => {
            const { address } = req.data || {};
            if (!address)
                throw new HttpsError('invalid-argument', 'address required');

            const ref = db.doc(`users/${address}`);
            if ((await ref.get()).exists)
                throw new HttpsError('already-exists', 'wallet already onboarded');

            const data: User = {
                address,
                username: '',
                displayName: '',
                bio: '',
                profilePicture: '',
                coverPicture: '',
                socialLinks: [],
                followersCount: 0,
                followingCount: 0,
                publicationsCount: 0,
                verified: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            await ref.set(data);
            console.log(`🆕 profile created for ${address}`);
            return { user: data };
        }
    )
);

export const usersUpdate = onCall(
    { region: 'auto' },
    async (req): Promise<{ user: User }> => {
        const { address, patch } = req.data || {};
        if (!address || !patch)
            throw new HttpsError('invalid-argument', 'missing inputs');

        const ref = db.doc(`users/${address}`);
        await ref.update({ ...patch, updatedAt: Date.now() });

        const snap = await ref.get();
        const user = snap.data() as User;
        console.log(`✏️  profile updated for ${address}`);
        return { user };
    }
);
