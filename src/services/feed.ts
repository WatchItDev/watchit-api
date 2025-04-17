import { ServiceManager } from './manager';

export class FeedService extends ServiceManager {
    newest = (limit = 20) => this.ds.Posts.listNewest(limit);
    popular = (limit = 20) => this.ds.Posts.listPopular(limit);
}
