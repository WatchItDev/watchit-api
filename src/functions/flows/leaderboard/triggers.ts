import { onSchedule }      from 'firebase-functions/v2/scheduler'
import { enhanceFunction } from '../../manager'

export const leaderboard = onSchedule('every day',
    enhanceFunction(async ({ ds }) => {
            console.log('🏆  Refreshing leaderboard')
            const top = await ds.Users.topByXp(100)
            await Promise.all(
                top.map((u, i) =>
                    ds.LeaderboardDS.upsertRow(u.address, i + 1, u.xpTotal))
            )
            console.log('🏆  Leaderboard done')
    }),
)
