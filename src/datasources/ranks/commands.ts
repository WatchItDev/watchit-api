import { DataSourceManager } from '../manager';
import {Rank, RankInput} from "@/schema/types";
import {makeRank} from "@/models/rank";

export class RanksCommands extends DataSourceManager {
    /** Bulk import or upsert – used only by CI / content pipelines */
    async upsertRanks(list: Rank[]): Promise<void> {
        const dao = this.fs<Rank>('ranks') as any;
        const batch = list.map(r => dao.ref.doc(r.id).set(r, { merge: true }));
        await Promise.all(batch);
    }

    createRank(input: RankInput): Promise<Rank> {
        const rec = makeRank(input);
        return this.fs<Rank>('ranks').create(rec.id, rec).then(() => rec);
    }

    updateRank(id: string, patch: Partial<RankInput>): Promise<Rank> {
        return this.fs('ranks')
            .update(id, { ...patch, updatedAt: Date.now() })
            .then(() => this.fs<Rank>('ranks').get(id) as Promise<Rank>);
    }

    deleteRank(id: string) {
        return this.fs('ranks').delete(id).then(() => true);
    }
}
