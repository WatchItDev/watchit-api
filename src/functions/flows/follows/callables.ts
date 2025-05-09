import 'reflect-metadata';
import { onCall }          from 'firebase-functions/v2/https';
import { enhanceFunction } from '../../manager';
import type { FollowInput } from '../../../schema/types';

/* ---------- follow / unfollow (toggle) -------- */
export const toggleFollow = onCall(
    { region: 'us-central1' },
    enhanceFunction(async ({ ds }, req): Promise<{ success: boolean }> => {
        const { me, targetAddress } = req.data as FollowInput & { me: string };
        const success = await ds.Follows.toggleFollow(me, targetAddress);
        return { success };
    }),
);
