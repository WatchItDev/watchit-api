import { DataSourceManager } from '../manager';

export class LikesCommands extends DataSourceManager {
  addLike(addr: string, targetId: string, targetType: string) {
    return this.fs('likes').create(`${addr}_${targetId}`, {
      targetId,
      targetType,
      author: addr,
      createdAt: Date.now(),
    });
  }
  removeLike(addr: string, targetId: string) {
    return this.fs('likes').delete(`${addr}_${targetId}`);
  }
}
