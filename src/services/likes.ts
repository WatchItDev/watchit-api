import { toggle } from '../helpers/toggle';
import { ServiceManager } from './manager';

export class LikesService extends ServiceManager {
  toggleLike = (address: string, targetId: string, targetType: string) =>
    toggle(
      () => this.ds.Likes.isLiked(address, targetId),
      () => this.ds.Likes.addLike(address, targetId, targetType),
      () => this.ds.Likes.removeLike(address, targetId),
    );

  isLiked = (address: string, targetId: string) => this.ds.Likes.isLiked(address, targetId);
}
