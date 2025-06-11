import { DataSourceManager } from '../manager';

export class LikesCommands extends DataSourceManager {
    addLike(addr: string, targetId: string, targetType: string) {
        return this.fs('likes').create(`${addr}_${targetId}`, {
            author: addr,
            targetId,
            targetType,
            createdAt: Date.now(),
        })
    }
    removeLike(addr: string, targetId: string) {
        return this.fs('likes').delete(`${addr}_${targetId}`)
    }
}
