import { onSchedule }      from 'firebase-functions/v2/scheduler';
import { enhanceFunction } from '../../manager';

/**
 * Refresh the public leaderboard every 10 minutes using UsersQuery.topByXp().
 */
export const leaderboard = onSchedule(
    'every 1 minute',
    enhanceFunction(async ({ ds }) => {
        console.log('🏆  Refreshing leaderboard...');
        const top = await ds.Users.topByXp(100);

        await Promise.all(
            top.map((u, i) => ds.Users.setLeaderboard(u.address, i + 1, u.xpTotal)),
        );

        console.log('🏆  Leaderboard refreshed');
    }),
);
