import { DataSourceManager } from '../manager';

export class LikesQuery extends DataSourceManager {
    isLiked(addr: string, targetId: string) {
        return this.fs('likes').exists(`${addr}_${targetId}`)
    }
}
