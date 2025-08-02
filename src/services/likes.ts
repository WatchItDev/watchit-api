import { ServiceManager } from './manager';
import { toggle } from "../helpers/toggle";

export class LikesService extends ServiceManager {
    toggleLike = (address: string, targetId: string, targetType: string) =>
        toggle(
            () => this.ds.Likes.isLiked(address, targetId),
            () => this.ds.Likes.addLike(address, targetId, targetType),
            () => this.ds.Likes.removeLike(address, targetId),
        )

    isLiked = (address: string, targetId: string) =>
        this.ds.Likes.isLiked(address, targetId);
}
