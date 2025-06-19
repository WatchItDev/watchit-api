import { DataSourceManager } from '../manager';
import type { GameConfig }   from '../../models/game';
import type { GameSession }  from '../../models/gameSession';

export class GamesQuery extends DataSourceManager {
    getConfig = (id: GameConfig['id']) => this.fs<GameConfig>('games').get(id);

    listConfigs = () => this.fs<GameConfig>('games').list(20);

    getSession = <T>(sid: string) => this.fs<GameSession<T>>('gameSessions').get(sid);
}
