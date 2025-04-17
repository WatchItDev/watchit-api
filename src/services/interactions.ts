import { ServiceManager } from './manager';

export class InteractionsService extends ServiceManager {
    likePost = (user, post) => this.ds.Interactions.likePost(user, post);
    unlikePost = (user, post) => this.ds.Interactions.unlikePost(user, post);

    bookmarkPost = (user, post) =>
        this.ds.Interactions.bookmarkPost(user, post);
    unbookmarkPost = (user, post) =>
        this.ds.Interactions.unbookmarkPost(user, post);

    addComment = (user, post, content, parent) =>
        this.ds.CommentsC.addComment(post, user, content, parent);
}
