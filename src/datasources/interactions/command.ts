import { DataSourceManager } from '@/datasources/manager';
import { increment, FieldValue } from 'firebase-admin/firestore';

export class InteractionsCommand extends DataSourceManager {
    /* likes ------------------------------------------------------------ */
    likePost = (user: string, postId: string) =>
        this.toggle('posts', postId, 'likes', user, 1);

    unlikePost = (user: string, postId: string) =>
        this.toggle('posts', postId, 'likes', user, -1);

    likeComment = (
        user: string,
        postId: string,
        commentId: string,
        value: 1 | -1
    ) =>
        this.toggle(
            `posts/${postId}/comments`,
            commentId,
            'likes',
            user,
            value
        );

    /* bookmarks -------------------------------------------------------- */
    bookmarkPost = (user: string, postId: string) =>
        this.toggle('posts', postId, 'bookmarks', user, 1, 'bookmarkCount');

    unbookmarkPost = (user: string, postId: string) =>
        this.toggle('posts', postId, 'bookmarks', user, -1, 'bookmarkCount');

    /* generic helper --------------------------------------------------- */
    private async toggle(
        collection: string,
        docId: string,
        sub: string,
        userId: string,
        delta: 1 | -1,
        counter: 'likeCount' | 'bookmarkCount' = 'likeCount'
    ) {
        const mainDoc = this.fs<any>(collection);
        const subCol = this.fs<any>(`${collection}/${docId}/${sub}`);

        if (delta === 1) {
            await subCol.create(userId, { createdAt: Date.now() });
        } else {
            await subCol.delete(userId);
        }
        await mainDoc.update(docId, { [counter]: increment(delta) });
    }
}
