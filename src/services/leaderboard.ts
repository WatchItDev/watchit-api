import { ServiceManager } from './manager'

export class LeaderboardService extends ServiceManager {
    async rows(limit = 100) {
        const raw = await this.ds.LeaderboardDS.rows(limit)
        const enriched = await Promise.all(
            raw.map(async (row) => {
                const user = await this.ds.Users.getUser(row.user)
                return user ? { ...row, user } : null
            }),
        )

        return enriched.filter(Boolean)
    }
}
