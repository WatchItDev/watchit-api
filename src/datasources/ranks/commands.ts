import { DataSourceManager } from '../manager';
import { Rank, RankInput }   from '../../schema/types';
import { makeRank }          from '../../models/rank';
import {makeUserRank} from "../../models/userRank";

export class RanksCommands extends DataSourceManager {
    createRank = (i: RankInput) =>
        this.fs<Rank>('ranks').create(i.id, makeRank(i)).then(() => this.fs<Rank>('ranks').get(i.id)!);

    updateRank = (id: string, p: Partial<RankInput>) =>
        this.fs('ranks').update(id, { ...p, updatedAt: Date.now() })
            .then(() => this.fs<Rank>('ranks').get(id)!);

    deleteRank = (id: string) =>
        this.fs('ranks').delete(id).then(() => true);

    addUserRank = (user: string, rankId: string) =>
        this.fs('userRanks')
            .create(`${user}_${rankId}`, makeUserRank(user, rankId));
}
