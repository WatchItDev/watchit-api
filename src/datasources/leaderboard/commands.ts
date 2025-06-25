import { DataSourceManager } from '../manager'

export class LeaderboardCommands extends DataSourceManager {
    async upsertRow(addr: string, rank: number, xp: number) {
        await this.fs('leaderboard').create(addr, { user: addr, rank, xpTotal: xp })
    }
}
