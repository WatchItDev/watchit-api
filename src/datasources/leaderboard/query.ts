import { DataSourceManager } from '../manager'

interface LeaderboardRow {
    user: string
    rank: number
    xpTotal: number
}

export class LeaderboardQuery extends DataSourceManager {
    rows = (limit = 100) =>
        this.fs<LeaderboardRow>('leaderboard')
            .query([], { orderBy: { field: 'rank', direction: 'asc' }, limit })
}
