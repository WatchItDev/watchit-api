import { DataSourceManager } from '../manager';
import {Rank} from "@/schema/types";

export class RanksQuery extends DataSourceManager {
    getRank = (id: string) => this.fs<Rank>('ranks').get(id);

    async catalog(): Promise<Rank[]> {
        return this.fs<Rank>('ranks').list(100);
    }

    /** Given total XP, return current + next rank */
    async evaluate(totalXp: number) {
        const ranks = await this.catalog();
        if (!ranks.length)
            throw new Error('Ranks catalog is empty – cannot evaluate.');

        ranks.sort((a, b) => a.minXp - b.minXp);

        const current = ranks.filter(r => r.minXp <= totalXp).pop()!;
        const next    = ranks.find(r => r.minXp > current.minXp) ?? null;

        return { current, next };
    }
}
