import { DataSourceManager } from '../manager';
import { GameSession, makeGameSession } from '@/models/gameSession';

export class GamesCommands extends DataSourceManager {
    createSession<T>(p: {
        user: string; gameId: GameSession['gameId']; version: number;
        state: T; expiresInSec: number;
    }): Promise<GameSession<T>> {
        const session = makeGameSession(p);
        return this.fs<GameSession>('gameSessions')
            .create(session.id, session)
            .then(() => session);
    }

    updateSession<T>(sid: string, patch: Partial<GameSession<T>>) {
        return this.fs('gameSessions')
            .update(sid, { ...patch, updatedAt: Date.now() });
    }

    async closeSession(sessionId: string) {
        await this.fs('gameSessions').delete(sessionId);
    }
}
